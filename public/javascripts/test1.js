var bigImg = document.getElementsByClassName("bigImg")[0];
        var smallImgs = document.getElementsByClassName("smallImg");

        for (var i=0;i<smallImgs.length;i++){
            // 2.遍历集合，给每个img标签添加事件
            smallImgs[i].onmouseover = function (){

                // 3.事件处理程序
                // 3.1在悬浮到每个li标签之前，先把所有的li标签的类名都置为空值
                for (var j=0;j<smallImgs.length;j++){
                    smallImgs[j].parentNode.parentNode.setAttribute("class","");
                }

                // 3.2修改大图的src属性值
                var smallImgSrc = this.getAttribute("src");
                bigImg.setAttribute("src",smallImgSrc);
                // 3.3给鼠标悬浮的img标签的父标签添加类
                this.parentNode.parentNode.setAttribute("class","active");

            }
        }