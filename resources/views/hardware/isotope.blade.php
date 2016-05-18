<!DOCTYPE HTML>
@extends('layouts/default')
<style>
.grid-sizer,
.grid-item {
    float:left;
    width:150px;
    height:150px;
    }
.grid-item-width2 {width: 40%;}
.grid { margin: 0 auto; }
</style>
@section('content')
    <div class="grid" id="items">
        <!-- Will be filled with posts -->
    </div>
@stop

@section('moar_scripts')
<script src="https://npmcdn.com/isotope-layout@3.0/dist/isotope.pkgd.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.75/jsrender.js"></script>
<script id="post-template" type="text/x-jsrender">
@%if image %@
<div class="grid-item">
        @%:#data['image']%@
         @%:name%@
</div>
@%/if%@
</script>

<script>
    $(document).ready( function() {  
        $.views.settings.delimiters("@%","%@");
                
        $.getJSON( "{{route('api.hardware.list') . '?limit=200'}}", function(data) {
            var template = $.templates("#post-template");
            var htmlOutput = template.render(data.rows);
            console.log(htmlOutput);
            
            $("#items").html(htmlOutput);
            $("#items").isotope({
                itemSelector: '.grid-item',
                layoutMode: 'masonry',
                masonry: {
                    columnWidth: 100,
                    gutter: 05
                }
            });
        });
    });

    $(window).load( function() {
        $("#items").isotope('layout');
    });
    
    var page = 2;
    $(window).scroll(function() {
       var scrollTop = $(window).scrollTop;
       var windowHeight = $(window).height();
       var docuHeight = $(document).height();
       if ($(window).scrollTop() >= ($(window).height() - 50)) {
       
    //    if(scrollTop + windowHeight == docuHeight) {
           page++;
           var localroute = "{{route('api.hardware.list') . '?limit=100'}}";
           $.getJSON( localroute + "&offset=" + page * 100, function(data) {
            var template = $.templates("#post-template");
            var htmlOutput = template.render(data.rows);
            // alert(htmlOutput);
            
            // $("#items").html(htmlOutput);
            $("#items").append(htmlOutput).isotope( 'appended', htmlOutput).isotope('layout');
        });
       } 
    });

</script>
@stop
