(function () {

    // 首页导航点击事件
    $(".flex_nav div").click(function () {
        $(".popup_win").css("display", "flex");
        $(".pop_nav button").eq($(this).index()).attr("class", "active").siblings().attr("class", "");
        $(".right_content>div").eq($(this).index()).css("display", "flex").siblings().css("display", "none");
    })

    // 关闭弹框
    $(".close_popup").click(function () {
        $(".popup_win").css("display", "none");
    })

    // 弹框内导航
    $(".pop_nav button").click(function () {
        $(".popup_win").css("display", "flex");
        $(this).attr('class', "active").siblings().attr("class", "");
        $(".right_content>div").eq($(this).index()).css("display", "flex").siblings().css("display", "none");
    })

    $.ajax({
        type: "GET",
        url: "vm_datas/datas.json",
        dataType: "json",
        success: success
    })

    function success(result) {
        var pic = result.picture;
        var currentPgf = 0; //当前页第一张图片
        var currentPge = currentPgf + 10; //当前页最后一张图片
        var page_lg = ""; //页数

        page_lg = pic.length % 10 == 0 ? pic.length / 10 : Math.ceil(pic.length / 10);

        $(".totall_page").val(page_lg);

        // 图片渲染
        function current(pFPg, pEPg) {
            for (var i = pFPg; i < pEPg; i++) {
                var Picline = $("<img src='img/" + pic[i] + "'/>");
                $(".left_top").append(Picline);
            }
        }
        current(currentPgf, currentPge);

        // 上一页
        $(".up_page").click(function () {
            currentPgf = currentPgf - 10;
            if (0 <= currentPgf < (page_lg - 1) * 10) {
                currentPge = currentPgf + 10;
            }
            if (currentPgf == (page_lg - 1) * 10) {
                currentPge = pic.length;
            }
            if (currentPgf < 0) {
                currentPgf = (page_lg - 1) * 10;
                currentPge = pic.length;
            }
            $(".left_top").empty();
            current(currentPgf, currentPge);
            var currenet_val = Number($(".current_page").val());
            currenet_val = currenet_val - 1;
            if (currenet_val == 0) {
                currenet_val = page_lg;
            }
            $(".current_page").val(currenet_val);

        })
        // 下一页
        $(".next_page").click(function () {
            currentPgf = currentPgf + 10;
            if (0 <= currentPgf < (page_lg - 1) * 10) {
                currentPge = currentPgf + 10;
            }
            if (currentPgf == (page_lg - 1) * 10) {
                currentPge = pic.length;
            }
            if (currentPgf > (page_lg - 1) * 10) {
                currentPgf = 0;
                currentPge = currentPgf + 10;
            }
            $(".left_top").empty();
            current(currentPgf, currentPge);
            var currenet_val = Number($(".current_page").val());
            currenet_val = currenet_val + 1;
            if (currenet_val > page_lg) {
                currenet_val = 1;
            }
            $(".current_page").val(currenet_val);
        })
        //跳页
        $(".Jump").click(function () {
            var jumppg = Number($(".Jump_page").val());

            if (jumppg > page_lg || jumppg <= 0) {
                alert("无此页数据,最大页数:" + page_lg);
                $(".Jump_page").val("");
            } else {
                $(".current_page").val(jumppg);
                currentPgf = (jumppg - 1) * 10;
                if (0 <= currentPgf < (page_lg - 1) * 10) {
                    currentPge = currentPgf + 10;
                }
                if (currentPgf == (page_lg - 1) * 10) {
                    currentPge = pic.length;
                }
                if (currentPgf > (page_lg - 1) * 10) {
                    currentPgf = 0;
                    currentPge = currentPgf + 10;
                }
                $(".left_top").empty();
                current(currentPgf, currentPge);
            }
        })
        var j = 0;
        setInterval(function () {
            $(".picture img").attr("src", "img/Photo" + j + ".jpg"); 
            j++;
            if (j > pic.length) {
                j = 0;
            }
        }, 1000)
    }

})()