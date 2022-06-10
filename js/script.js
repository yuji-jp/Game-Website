$(function (){
  var loading = $(".loading")

  //読み込み完了後にアニメーション非表示・fvの高さ調整
  $(window).on("load",function(){
    var windowHight =$(window).height();
    $(".fv").height(windowHight);
    loading.delay("1000").fadeOut("2000");
  });

//読み込み未完了でもアニメーション非表示//
  setTimeout(function () {
    loading.fadeOut("3000");
  }, 8000);

  //画面リサイズ時にMVの高さを調整
  $(window).resize(function () {
    var windowHeight = $(window).height();
    $("#fv").height(windowHeight);
  });

  //ページ内スクロール
  $('a[href^="#"]').on("click", function () {
    var speed = 300;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top;
    $("html, body").animate(
      {
        scrollTop: position,
      },
      speed,
      "swing"
    );
    return false;
  });

  //SP用のCTAボタンの表示
  if (window.matchMedia("(max-width: 768px)").matches) {
    $spCta = $(".spCta");
    $spCta.hide();
    $(window).scroll(function () {
      if ($(this).scrollTop() > 1000) {
        $spCta.fadeIn();
      } else {
        $spCta.fadeOut();
      }
    });
    $spCta.on("click", function () {
      $("body,html").animate({ scrollTop: 0 }, 300);
      return false;
    });
  }

  //オーディオの再生と停止
  var audio = $("#js-audio").get(0);
  var isPlaying = false;
  audio.volume = 0.5;

  $("#js-audio-play").click(function () {
    if (isPlaying) {
      audio.pause();
      $(".audioSwitch").removeClass("on");
      $(".audioSwitch-text").html("SOUND OFF");
    } else {
      audio.play();
      $(".audioSwitch").addClass("on");
      $(".audioSwitch-text").html("SOUND ON");
    }
  });
  audio.onplaying = function () {
    isPlaying = true;
  };
  audio.onpause = function () {
    isPlaying = false;
  };

});