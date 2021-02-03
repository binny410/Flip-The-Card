$(document).ready(function () {

    // Array with values to be shuffled.
    var arr = ["hinata.png", "itachi.jpg", "kakashi.png", "minato.png", "naruto.jpg", "sakura.png", "sasuke.jpg", "team7.png", "minato.png", "sasuke.jpg", "naruto.jpg", "itachi.jpg", "hinata.png", "team7.png", "kakashi.png", "sakura.png"];

    //    Initial score value.
    let score = 0;
    //    Counter time.
    let timer = 3;
    //    Set time as 0 initially. 
    let t = 0;
    //Initial value of clicks.
    let clicks = 0;
    //Initial value of points.
    let points = 0;

    // Shuffle function
    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;

        }
        return array;
    };

    // Shuffling array.
    shuffleArray(arr);

    //Begin the count down.

    var myinterval = setInterval(function () {
        if (timer == 0) {
            clearInterval(myinterval)
        } else {
            timer = timer - 1;
            $("#timer").text(timer)
        }
    }, 1000)

    //    Clearing the screen for play to begin.

    setTimeout(function () {
        $(".card").each(function () {
            $(this).removeClass("rollover");
        })
        $(".startScreen").fadeOut();
    }, 3000)



    /* Time counter to complete the game.*/
    setInterval(function () {
        t = t + 1
        $("#time").text(t + " Sec");
    }, 1000);

    // For loop to print the randum numbers with the cards.
    for (var i = 0; i < arr.length; i++) {

        $(".containers").append('<div class="card rollover"> <div class = "front"><img class= "frontFace" src="img/front-pic.png" alt="card front"></div><div class="back"><img class= "frontFace" src="img/' + arr[i] + '"></div></div>');
    }


    //    NEW CODE..
    //    Getting value of the clicked card.
    $(".card").click(function (index) {
        var checkArray = []

        $(".card").each(function () {
            if ($(this).hasClass("done")) {
                checkArray.push(1)
            }
        })

        //If all the cards has been revealed.
        if (checkArray.length == arr.length) {
            $(".endScreen").removeClass("hide");
        } else {
            //Incrementing value of click.
            clicks = clicks + 1;
            $("#click").text(clicks);

            //            getting id of the clicked div.
            var elmId = $(this).attr('id');
            console.log("elmid: " + elmId);

            if ($(this).hasClass("done")) {
                //Nothing 
            } else {
                //getting first click's value stored.
                var firstClick = $(this);
                $(this).addClass("rollover");
                //getting src of the first clicked img.
                var firstImg = $(this).find(".back img").attr("src");

                //getting index of the clicked div.
                var currentIndex = $(this).index();
                console.log("currentIndex: " + currentIndex);


                $(".card").each(function (index) {
                    if (currentIndex == $(this).index()) {
                        //nothing will happen
                    } else {
                        if ($(this).hasClass("rollover")) {
                            var secondImg = $(this).find(".back img").attr("src"); /*value of 2nd clcik*/

                            if (firstImg == secondImg) {
                                // points on 2 matching cards.
                                points = points + 100;
                                $("#points").text(points);

                                //this value of 2nd clicked card.
                                var secondClick = $(this);
                                setTimeout(function () {
                                    secondClick.addClass("done").removeClass("rollover");
                                    firstClick.addClass("done").removeClass("rollover");

                                }, 1000)
                            } else {
                                if (points == 0) {

                                } else {
                                    points = points - 20;
                                    $("#points").text(points);
                                }

                                var secondClick = $(this)
                                setTimeout(function () {
                                    secondClick.removeClass("rollover");
                                    firstClick.removeClass("rollover");

                                }, 800)


                            }


                        }
                    }
                })

            }

        }

    });
});


//reload function.
function reloading() {
    location.reload();
}
