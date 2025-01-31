
var shares=null;
var Intent=null,File=null,Uri=null,main=null;
// H5 plus事件处理
function plusReady(){
    updateSerivces();
    if(plus.os.name=="Android"){
        main = plus.android.runtimeMainActivity();
        Intent = plus.android.importClass("android.content.Intent");
        File = plus.android.importClass("java.io.File");
        Uri = plus.android.importClass("android.net.Uri");
    }
}
if(window.plus){
    plusReady();
}else{
    document.addEventListener("plusready",plusReady,false);
}
 
/**
 * 
 * 更新分享服务
 */
function updateSerivces(){
    plus.share.getServices( function(s){
        shares={};
        for(var i in s){
            var t=s[i];
            shares[t.id]=t;
        }
    }, function(e){
        alert("获取分享服务列表失败："+e.message );
    } );
}
 
 
 
/**
   * 分享操作
   * @param {JSON} sb 分享操作对象s.s为分享通道对象(plus.share.ShareService)
   * @param {Boolean} bh 是否分享链接
   */
function shareAction(sb,bh) {
    if(!sb||!sb.s){
        alert("无效的分享服务！");
        return;
    }
    
    var msg={content:'',extra:{scene:sb.x}};
    // if(bh){
    //     msg.href=sharehref.value;
    //     if(sharehrefTitle&&sharehrefTitle.value!=""){
    //         msg.title=sharehrefTitle.value;
    //     }
    //     if(sharehrefDes&&sharehrefDes.value!=""){
    //         msg.content=sharehrefDes.value;
    //     }
    //     msg.thumbs=["_www/logo.png"];
    //     msg.pictures=["_www/logo.png"];
    // }else{
    //     if(pic&&pic.realUrl){
    //         msg.pictures=[pic.realUrl];
    //     }
    // }
 
    msg.thumbs=["http://59.110.138.64:8521/image/share.jpg"];
    msg.pictures=["http://59.110.138.64:8521/image/share.jpg"];
    msg.href='http://59.110.138.64:8521';
    msg.title='car';
    msg.content='快来下载我的App！';
 
    // 发送分享
    if ( sb.s.authenticated ) {
        // alert("---已授权---");
        shareMessage(msg,sb.s);
    } else {
        // alert("---未授权---");
        sb.s.authorize( function(){
                shareMessage(msg,sb.s);
            },function(e){
                // alert("认证授权失败："+e.code+" - "+e.message );
            
        });
    }
}
/**
   * 发送分享消息
   * @param {JSON} msg
   * @param {plus.share.ShareService} s
   */
function shareMessage(msg,s){
    
    // alert(JSON.stringify(msg));
    s.send( msg, function(){
        // alert("分享到\""+s.description+"\"成功！ ");
        
    }, function(e){
        // alert( "分享到\""+s.description+"\"失败: "+JSON.stringify(e) );
    
    } );
}
// 分析链接
function shareHref(){
    var shareBts=[];
    // 更新分享列表
    var ss=shares['weixin'];
    ss&&ss.nativeClient&&(shareBts.push({title:'微信朋友圈',s:ss,x:'WXSceneTimeline'}),
    shareBts.push({title:'微信好友',s:ss,x:'WXSceneSession'}));
    ss=shares['qq'];
    ss&&ss.nativeClient&&shareBts.push({title:'QQ',s:ss});
    // 弹出分享列表
    shareBts.length>0?plus.nativeUI.actionSheet({title:'分享链接',cancel:'取消',buttons:shareBts},function(e){
        (e.index>0)&&shareAction(shareBts[e.index-1],true);
    }):plus.nativeUI.alert('当前环境无法支持分享链接操作!');
}export default{
  shareHref //该步骤重要

}