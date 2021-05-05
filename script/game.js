var bgm = new Audio('mp3/bgm.mp3');
var shiny_m = new Audio('mp3/shiny.mp3');
var spinOpen_m = new Audio('mp3/open_spin.mp3');
var spinClose_m = new Audio('mp3/close_spin.mp3');
var wheel_m = new Audio('mp3/wheel.mp3');


// 背景音樂循環播放
bgm.loop = true

// 音樂圖標
$('.music').click(function () {
    bgm.play()
    $(this).toggleClass('music-stop')
    bgm.volume = $(this).hasClass('music-stop') ? 0 : 1
})

// muted
// 指針閃光
$('#testBtn button').click(function () {
    var getId = $(this).attr('id')
    switch (getId) {
        case 'btn1':
            shiny_m.currentTime = 0
            shiny_m.play()
            $('.wheel_left .pointer').addClass('pointer-on')
            setTimeout(function () {
                $('.wheel_left .pointer').removeClass('pointer-on')
            }, 2000);
            break;

        case 'btn2':
            shiny_m.currentTime = 0
            shiny_m.play()
            $('.wheel_right .pointer').addClass('pointer-on')
            setTimeout(function () {
                $('.wheel_right .pointer').removeClass('pointer-on')
            }, 2000);
            break;
    }
})


// 臉部變化 - 閉眼，睜眼，看
$('#testBtn button').click(function () {
    var getId = $(this).attr('id')
    switch (getId) {
        case 'btn3':
            $('.wheel_left .face').removeClass().addClass('face').addClass('face-close');
            break;
        case 'btn4':
            $('.wheel_left .face').removeClass().addClass('face').addClass('face-open');
            break;
        case 'btn5':
            $('.wheel_left .face').removeClass().addClass('face').addClass('face-look');
            break;
        case 'btn6':
            $('.wheel_right .face').removeClass().addClass('face').addClass('face-close');
            break;
        case 'btn7':
            $('.wheel_right .face').removeClass().addClass('face').addClass('face-open');
            break;
        case 'btn8':
            $('.wheel_right .face').removeClass().addClass('face').addClass('face-look');
            break;
    }
})

// 轉輪旋轉
// 給予一個陣列將所有角度值push進去 36,72,108,144,180,216,252.....324
var wheelRan = []
for (var i = 0; i < 10; i++) {
    wheelRan.push(36 * i)
}

var nowRan_l = 0,nowRan_r = 0;       // 宣告現在角度初始為0
var nextRan_l, nextRan_r;            // 宣告一個變數用於紀錄下次的角度
var wheelran = document.querySelector('#wheelran')

$('#testBtn button').click(function () {
    var getId = $(this).attr('id')
    switch (getId) {
        case 'btn9':
            wheel_m.currentTime = 0     // currentTime 設為0 音效可連續觸發
            wheel_m.play()
            nextRan_l = wheelRan[parseInt(Math.random() * 10)];   // 隨機取出陣列的值作為本次旋轉的位置
            // 動態變更css keyframes內的值
            wheelran.innerHTML = `@keyframes wheel-on{0%{transform: rotate(${nowRan_l}deg);} 100% { transform: rotate(${nextRan_l + (nextRan_l - nowRan_l < 180 ? 720 : 360)}deg);}}`
 
            $('.wheel_left .wheel').addClass('wheel-on')    // 加上 class wheel-on 給予旋轉
            setTimeout(function () {
                $('.wheel_left .wheel').removeClass('wheel-on')
                nowRan_l = nextRan_l                       // 將這次的值賦予至現在值變數 用於下次判斷用
                $('.wheel_left .wheel').css('transform', `rotate(${nextRan_l}deg)`)   // 將輪盤rotate到相同角度
            }, 3000)
            break;

        case 'btn10':
            wheel_m.currentTime = 0
            wheel_m.play()
            nextRan_r = wheelRan[parseInt(Math.random() * 10)];
            wheelran.innerHTML = `@keyframes wheel-on{0%{transform: rotate(${nowRan_r}deg);} 100% { transform: rotate(${nextRan_r + (nextRan_r - nowRan_r < 180 ? 720 : 360)}deg);}}`
            $('.wheel_right .wheel').addClass('wheel-on')
            setTimeout(function () {
                $('.wheel_right .wheel').removeClass('wheel-on')
                nowRan_r = nextRan_r
                $('.wheel_right .wheel').css('transform', `rotate(${nextRan_r}deg)`)
            }, 3000)
            break;
    }
})

// SPIN 閘門
$('#testBtn button').click(function () {
    var getId = $(this).attr('id')

    switch (getId) {
        case 'btn11':
            spinClose_m.currentTime = 0
            spinClose_m.play()
            $('.wheel_right .spin').removeClass().addClass('spin').addClass('spin-close');
            break;
        case 'btn12':
            $('.wheel_right .spin').removeClass().addClass('spin').addClass('spin-shiny');
            break;
        case 'btn13':
            spinOpen_m.currentTime = 0
            spinOpen_m.play()
            $('.wheel_right .spin').removeClass().addClass('spin').addClass('spin-open');
            break;
    }
})

//賽果
$('#btn14').click(function () {
    $('.result').fadeToggle()
})


$('#btn_radio input').click(function () {
    $('#btn_radio input').removeClass('ckon')
    $(this).addClass('ckon')
})


var left = 10, right = 10;
$('#btn_nb button').click(function () {
    var getck = $('#btn_radio').find('.ckon').attr('id')
    var getId = $(this).attr('id').substr(3)

    if (getck == 'r1') {
        $('.result_left').removeClass().addClass('result_left').addClass(`result-${parseInt(getId) - 14}`)
        left = getId - 14
        chResult()
    }
    else if (getck == 'r2') {
        $('.result_right').removeClass().addClass('result_right').addClass(`result-${parseInt(getId) - 14}`)
        right = getId - 14
        chResult()
    }

})

function chResult() {
    $('.result_total').text(parseInt(left) + parseInt(right))

    if (parseInt(left) > parseInt(right)) {
        $('.result_hl').text('高')
        $('.result_hl').removeClass().addClass('result_hl').addClass('result_height')
    } else {
        $('.result_hl').text('低')
        $('.result_hl').removeClass().addClass('result_hl').addClass('result_low')
    }

    if ((parseInt(left) + parseInt(right)) % 2 == 0) {
        $('.result_oe').text('雙')
        $('.result_oe').removeClass().addClass('result_oe').addClass('result_even')
    } else {
        $('.result_oe').text('單')
        $('.result_oe').removeClass().addClass('result_oe').addClass('result_odd')
    }

}