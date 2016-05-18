@extends('layouts/default')
<style>
.grid-sizer,
.grid-item {width:20%;}
.grid-item-width2 {width: 40%;}
.grid { margin: 0 auto; }
</style>
@section('content')
    <div class="grid" id="items">
        <div class="grid-sizer"></div>
        <!-- Will be filled with posts -->
    </div>
@stop

@section('moar_scripts')
<script src="https://npmcdn.com/isotope-layout@3.0/dist/isotope.pkgd.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.75/jsrender.js"></script>
<script id="post" type="text/x-jsrender">
<div class="grid-item">
    <!-- <img src="{{asset('assets/img')}}/@%:#data['image-url']%@") width="25%"> -->
    <img src="@%:#data['image-url']%@">
 <!--    <em>Item:</em> @%:name%@ -->
</div>
</script>

<script>
    $(document).ready( function() {  
        $.views.settings.delimiters("@%","%@");
        var data = [
            {
                "name": "Teapot - White",
                "image-url": "http://dummyimage.com/300.png/09f/fff"
            },
            {
                "name": "Gold Oil Lamp",
                "image-url": "http://dummyimage.com/100.png/063/ff2"
            },
            {
                "name": "Little Silver Tray",
                "image-url": "http://dummyimage.com/200.png/69f/fff"
            },
            {
                "name": "Little Silver Tray",
                "image-url": "http://dummyimage.com/400.png/49f/fff"
            },
            {
                "name": "Little Silver Tray",
                "image-url": "http://dummyimage.com/200.png/89f/fff"
            },
            {
                "name": "Little Silver Tray",
                "image-url": "http://dummyimage.com/50.png/09f/fff"
            },
            {
                "name": "Little Silver Tray",
                "image-url": "http://dummyimage.com/20.png/69f/fff"
            },
            {
                "name": "Little Silver Tray",
                "image-url": "http://dummyimage.com/40.png/49f/fff"
            },
            {
                "name": "Little Silver Tray",
                "image-url": "http://dummyimage.com/150.png/89f/fff"
            },
            {
                "name": "Little Silver Tray",
                "image-url": "http://dummyimage.com/80.png/09f/fff"
            }
        ];
      
        var template = $.templates("#post");
        
        var htmlOutput = template.render(data);
        // console.log(htmlOutput);
        
        $("#items").html(htmlOutput);
        $("#items").isotope({
            itemSelector: '.grid-item',
            layoutMode: 'masonry',
            masonry: {
                columnWidth: 50,
                gutter: 10
            }
        });

    });

    $(window).load( function() {
        $("#items").isotope('layout');
    });

</script>
@stop
