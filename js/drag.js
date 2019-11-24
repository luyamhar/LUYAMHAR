/*
 * drag 1.0
 * create by tony@jentian.com
 * date 2015-08-18
 * æ‹–åŠ¨æ»‘å—
 */
(function($){
    $.fn.drag = function(options){
        var x, drag = this, isMove = false, defaults = {
        };
        var options = $.extend(defaults, options);
        //æ·»åŠ èƒŒæ™¯ï¼Œæ–‡å­—ï¼Œæ»‘å—
        var html = '<div class="drag_bg"></div>'+
                    '<div class="drag_text" onselectstart="return false;" unselectable="on">Slide for verfication</div>'+
                    '<div class="handler handler_bg"></div>';
        this.append(html);

        var handler = drag.find('.handler');
        var drag_bg = drag.find('.drag_bg');
        var text = drag.find('.drag_text');
        var maxWidth = drag.width() - handler.width();  //èƒ½æ»‘åŠ¨çš„æœ€å¤§é—´è·

        //é¼ æ ‡æŒ‰ä¸‹æ—¶å€™çš„xè½´çš„ä½ç½®
        handler.mousedown(function(e){
            isMove = true;
            x = e.pageX - parseInt(handler.css('left'), 10);
        });

        //é¼ æ ‡æŒ‡é’ˆåœ¨ä¸Šä¸‹æ–‡ç§»åŠ¨æ—¶ï¼Œç§»åŠ¨è·ç¦»å¤§äºŽ0å°äºŽæœ€å¤§é—´è·ï¼Œæ»‘å—xè½´ä½ç½®ç­‰äºŽé¼ æ ‡ç§»åŠ¨è·ç¦»
        $(document).mousemove(function(e){
            var _x = e.pageX - x;
            if(isMove){
                if(_x > 0 && _x <= maxWidth){
                    handler.css({'left': _x});
                    drag_bg.css({'width': _x});
                }else if(_x > maxWidth){  //é¼ æ ‡æŒ‡é’ˆç§»åŠ¨è·ç¦»è¾¾åˆ°æœ€å¤§æ—¶æ¸…ç©ºäº‹ä»¶
                    dragOk();
                }
            }
        }).mouseup(function(e){
            isMove = false;
            var _x = e.pageX - x;
            if(_x < maxWidth){ //é¼ æ ‡æ¾å¼€æ—¶ï¼Œå¦‚æžœæ²¡æœ‰è¾¾åˆ°æœ€å¤§è·ç¦»ä½ç½®ï¼Œæ»‘å—å°±è¿”å›žåˆå§‹ä½ç½®
                handler.css({'left': 0});
                drag_bg.css({'width': 0});
            }
        });

        //æ¸…ç©ºäº‹ä»¶
        function dragOk(){
            handler.removeClass('handler_bg').addClass('handler_ok_bg');
            text.text('Verferied Success');
            drag.css({'color': '#fff'});
            handler.unbind('mousedown');
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
            $("input[name='drag_ok']").val(1);
        }
    };
})(jQuery);

