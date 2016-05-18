<!DOCTYPE HTML>
@extends('layouts/default')
<style>
.grid-sizer,
.grid-item {
    float:left;
    width:100px;
    height:200px;
    }
.grid-item-width2 {width: 40%;}
.grid { margin: 0 auto; }
.popup-with-zoom {
    padding: 0;
}
.isotope.no-transition,
.isotope.no-transition .isotope-item,
.isotope .isotope-item.no-transition {
  -webkit-transition-duration: 0s;
     -moz-transition-duration: 0s;
      -ms-transition-duration: 0s;
       -o-transition-duration: 0s;
          transition-duration: 0s;
}

</style>
@section('content')
<div class="row">
    <div class="col-md-4 col-xs-6" id="category-select">{{ Form::select('modal-category', \App\Helpers\Helper::CategoryList() ,'', array('class'=>'select2 parent', 'style'=>'width:100%','id' => 'modal-category_id')) }}</div>
    <fieldset>
        <input type="text" id="search" name="search" />
        <button type="submit" id="search-submit" value="Search">Button</button>
    </fieldset>
</div>


<link rel="stylesheet" href="{{ asset('assets/css/magnific-popup.css') }}">
    <div class="grid popup-container" id="items">
        <!-- Will be filled with posts -->
    </div>
@stop
@section('moar_scripts')
<script src="https://npmcdn.com/isotope-layout@3.0/dist/isotope.pkgd.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.75/jsrender.js"></script>
<script src="{{ asset('assets/js/magnific-popup.js') }}"></script>

<script id="post-template" type="text/x-jsrender">
@%if imagePath %@
<div class="grid-item">
            <img class="popup-item" data-mfp-src="{{config('app.url') . 'uploads/assets/'}}@%:#data['imagePath']%@" src="{{config('app.url'). 'uploads/assets/thumbs/'}}@%:#data['imagePath']%@">
         @%:name%@
</div>
@%/if%@
</script>

<script>
    var queryUrlTemplate ="{!!route('api.hardware.list', ['Requestable' , 'withImages' => 'true', 'limit' => 'LIMIT_PH', 'offset' => 'OFFSET_PH', 'search' => 'SEARCH_PH', 'category' => 'CATEGORY_PH'])!!}";
    var jsonLimit = 50;
    var jsonSearch = '';
    var jsonOffset = '';
    var jsonCategory = '';
    $(document).ready( function() {  
        // Initialize Isotope
        $("#items").isotope({
            itemSelector: '.grid-item',
            layoutMode: 'masonry',
            masonry: {
                columnWidth: 115,
                gutter: 0
            }
        });
        $.views.settings.delimiters("@%","%@");
                
        generateIsotopeFromJsonLink( "{!!route('api.hardware.list', [ 'Requestable' , 'withImages' => 'true', 'limit' => '50'])!!}");
        
        $('.popup-container').magnificPopup({
            delegate: 'img.popup-item',
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            fixedContentPos: true,
            mainClass: 'popup-main popup-with-zoom',
            image: {
                verticalFit: true
            },
            zoom: {
                enabled: true,
                duration: 300
            }
        });
    });

    $(window).load( function() {
        $("#items").isotope('layout');
    });
    var running = false;
    $(window).scroll(function() {
       var scrollTop = $(window).scrollTop;
       var windowHeight = $(window).height();
       var docuHeight = $(document).height();
         if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
            if(!running) {
                running = true;
                //Add our filter
                $jsonOffset += 50; // Should probably make this adjustable, but not yet.
                generateIsotopeFromJsonLink();
                running = false;
            }
       } 
    });

    //Search
    $("#search").val("Search...").addClass("empty");

    $("#search").focus(function(){
        if($(this).val() == "Search...") {
            $(this).val("").removeClass("empty");
        }
    });

    $("#search").blur(function() {
        if($(this).val() == "") {
            $(this).val("Search...").addClass("empty");
        }
    });

    $("#search-submit").click(function(){
        var searchText = $("#search").val();
        if (searchText == "Search...")
            searchText = "";
        filter = searchText;

        // Clear Current items
        var $items = $('#items');
        var $elems = $items.isotope("getItemElements");
        $items.isotope('remove', $elems);

        //Add our filter and relayout
        jsonSearch = filter;
        jsonOffset = 0;
        generateIsotopeFromJsonLink();
    });

    $("#category-select").change(function(){
        var category = $("#modal-category_id").val();
        // Clear Current items
        var $items = $('#items');
        var $elems = $items.isotope("getItemElements");
        $items.isotope('remove', $elems);

        //Add Our Filter and Relayout
        // Clear Offset here as well.
        jsonCategory = category;
        jsonOffset=0;
        generateIsotopeFromJsonLink();
    });

    function generateIsotopeFromJsonLink() {
        // alert(jsonUrl);
        console.log('Updating Url');
        queryUrl = queryUrlTemplate.replace('LIMIT_PH', jsonLimit).replace('OFFSET_PH', jsonOffset).replace('SEARCH_PH', jsonSearch).replace('CATEGORY_PH', jsonCategory);   
        $.getJSON(queryUrl, function(data) {
            var template = $.templates("#post-template");
            var htmlOutput = template.render(data.rows);
            // console.log(htmlOutput);
            $("#items").isotope( 'insert', $(htmlOutput));
            $("#items").isotope('layout');
        });
    }
</script>
@stop
