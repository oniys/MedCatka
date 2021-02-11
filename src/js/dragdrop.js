

function drag() {
    document.ondragstart = () => false;

    document.onmousedown = event => {

        if (!event.target.classList.contains('cardContainer')) return;

        const scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight );

        target = event.target;
        saveX = event.offsetX;
        saveY = event.offsetY;


        document.onmousemove = event => {
            target.style.position = 'absolute';
            target.style.top = event.pageY  - 260 - saveY+'px';
            target.style.left = event.pageX - 150 - saveX + 'px';
            check(event, target, scrollHeight);
        }

        document.onmouseup = event => {
            document.onmousemove = null;
        }
    }

    function check(event, target, scrollHeight){
        if (event.pageX - saveX <=0) target.style.left = 0 ;
        if (event.pageY - saveY <=0) target.style.top = 0;
        if (event.pageY + (target.clientHeight - saveY) >= scrollHeight) {
            target.style.top = scrollHeight-target.clientHeight+'px';
        }
        if (event.pageX + (target.clientWidth - saveX) >= document.body.scrollWidth) target.style.left = document.body.scrollWidth - target.clientWidth+'px ';

        // statusСhange(scrollHeight)
    }



    // function statusСhange(event) {
    //
    //     console.log(event)
    //
    // }

}