<!DOCTYPE HTML>
@extends('layouts/default')
<style>
.grid-sizer,
.grid-item {
    float:left;
<<<<<<< 1acec5d7226355ce0c6049cb6be3eb8710e34f05
<<<<<<< a096c58e680095c53ae43228b9070a9d4b14e9db
    width:100px;
    height:200px;
=======
    width:150px;
    height:150px;
>>>>>>> More work on isotoping.  Pull images from api and lazy load.
=======
    width:100px;
    height:200px;
>>>>>>> Some more work on the isotope layout
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
<<<<<<< 1acec5d7226355ce0c6049cb6be3eb8710e34f05

</style>
@section('content')
<<<<<<< a096c58e680095c53ae43228b9070a9d4b14e9db
<div class="row">
    <div class="col-md-4 col-xs-6" id="category-select">{{ Form::select('modal-category', \App\Helpers\Helper::CategoryList() ,'', array('class'=>'select2 parent', 'style'=>'width:100%','id' => 'modal-category_id')) }}</div>
    <fieldset>
        <input type="text" id="search" name="search" />
        <button type="submit" id="search-submit" value="Search">Button</button>
    </fieldset>
</div>


<link rel="stylesheet" href="{{ asset('assets/css/magnific-popup.css') }}">
    <div class="grid popup-container" id="items">
=======
    <div class="grid" id="items">
>>>>>>> More work on isotoping.  Pull images from api and lazy load.
        <!-- Will be filled with posts -->
    </div>
@stop
@section('moar_scripts')
<script src="https://npmcdn.com/isotope-layout@3.0/dist/isotope.pkgd.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.75/jsrender.js"></script>
<<<<<<< a096c58e680095c53ae43228b9070a9d4b14e9db
<script src="{{ asset('assets/js/magnific-popup.js') }}"></script>

<script id="post-template" type="text/x-jsrender">
@%if imagePath %@
<div class="grid-item">
            <img class="popup-item" data-mfp-src="{{config('app.url') . 'uploads/assets/'}}@%:#data['imagePath']%@" src="{{config('app.url'). 'uploads/assets/thumbs/'}}@%:#data['imagePath']%@">
=======
<script id="post-template" type="text/x-jsrender">
@%if image %@
<div class="grid-item">
        @%:#data['image']%@
>>>>>>> More work on isotoping.  Pull images from api and lazy load.
=======
/* search css below */
/*fieldset { border: none }

#search-form {
	width: 190px;
	position: relative;
}*/
/*#search {
	background: #b2a48c;
	border: 3px solid #402f1d;
	color: #2b1e11;
	height: 20px;
	line-height: 20px;
	width: 150px;
	padding: 2px 4px;
	position: absolute;
	top: 11px;
	left: 0
}
#search-submit {
	background: #b2a48c url(../images/search.png) no-repeat 12px 7px;
	border: 3px solid #402f1d;
	height: 50px;
	width: 50px;
	position: absolute;
	top: 0;
	right: 0
}*/

.empty {
	color: #524630;
}

/* CSS3 */
/*#search { border-radius: 20px; 
	-moz-border-radius: 20px; 
	-webkit-border-radius: 20px;
	background: -webkit-gradient(linear, left top, left bottom, from(#b2a48c), to(#9b8d74));
	background: -moz-linear-gradient(top, #b2a48c, #9b8d74);
	text-shadow: rgba(0,0,0,.2) 0 0 5px;
}

#search-submit { 
	border-radius: 50px; 
	-moz-border-radius: 50px; 
	-webkit-border-radius: 50px; 
	-mox-box-shadow: 0 0 5px black;

	/* Webkit-transition */
	-webkit-transition-property: background-color; 
	-webkit-transition-duration: 0.4s, 0.4s; 
	-webkit-transition-timing-function: linear, ease-in;
	}*/
</style>
@section('content')
<form action="" id="search-form">
    <fieldset>
        <input type="text" id="search" name="search" />
        <input type="submit" id="search-submit" value="" />
    </fieldset>
</form>
<link rel="stylesheet" href="{{ asset('assets/css/magnific-popup.css') }}">
    <div class="grid popup-container" id="items">
        <!-- Will be filled with posts -->
    </div>
@stop
        <!--<a class="popup-item" href="{{config('app.url') . '/uploads/assets/'}}@%:#data['image-path']%@">-->
@section('moar_scripts')
<script src="https://npmcdn.com/isotope-layout@3.0/dist/isotope.pkgd.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.75/jsrender.js"></script>
<script src="{{ asset('assets/js/magnific-popup.js') }}"></script>

<script id="post-template" type="text/x-jsrender">
@%if image %@
<div class="grid-item">

            <img class="popup-item" data-mfp-src="{{config('app.url') . '/uploads/assets/'}}@%:#data['image-path']%@" src="{{config('app.url').'/uploads/assets/thumbs/'}}@%:#data['image-path']%@">
>>>>>>> Some more work on the isotope layout
         @%:name%@
</div>
@%/if%@
</script>

<script>
<<<<<<< 1acec5d7226355ce0c6049cb6be3eb8710e34f05
    var queryUrlTemplate ="{!!route('api.hardware.list', ['Requestable' , 'withImages' => 'true', 'limit' => 'LIMIT_PH', 'offset' => 'OFFSET_PH', 'search' => 'SEARCH_PH', 'category' => 'CATEGORY_PH'])!!}";
    var jsonLimit = 50;
    var jsonSearch = '';
    var jsonOffset = '';
    var jsonCategory = '';
=======
    var filter ="";
>>>>>>> Some more work on the isotope layout
    $(document).ready( function() {  
<<<<<<< a096c58e680095c53ae43228b9070a9d4b14e9db
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
=======
        $.views.settings.delimiters("@%","%@");
                
        $.getJSON( "{!!route('api.hardware.list', [ 'Requestable' , 'withImages' => 'true', 'limit' => '50'])!!}", function(data) {
            var template = $.templates("#post-template");
            var htmlOutput = template.render(data.rows);
            // console.log(htmlOutput);
            
            $("#items").html(htmlOutput);
            $("#items").isotope({
                itemSelector: '.grid-item',
                layoutMode: 'masonry',
                masonry: {
                    columnWidth: 115,
                    gutter: 0
                }
            });
>>>>>>> More work on isotoping.  Pull images from api and lazy load.
        });
        
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
<<<<<<< 1acec5d7226355ce0c6049cb6be3eb8710e34f05
<<<<<<< a096c58e680095c53ae43228b9070a9d4b14e9db
    var running = false;
=======
    
    var page = 2;
>>>>>>> More work on isotoping.  Pull images from api and lazy load.
=======
    var running = false;
    var page = 1;
>>>>>>> Some more work on the isotope layout
    $(window).scroll(function() {
       var scrollTop = $(window).scrollTop;
       var windowHeight = $(window).height();
       var docuHeight = $(document).height();
<<<<<<< 1acec5d7226355ce0c6049cb6be3eb8710e34f05
<<<<<<< a096c58e680095c53ae43228b9070a9d4b14e9db
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
=======
       if ($(window).scrollTop() >= ($(window).height() - 50)) {
       
    //    if(scrollTop + windowHeight == docuHeight) {
           page++;
           var localroute = "{{route('api.hardware.list') . '?limit=100'}}";
           $.getJSON( localroute + "&offset=" + page * 100, function(data) {
            var template = $.templates("#post-template");
            var htmlOutput = template.render(data.rows);
            // alert(htmlOutput);
=======
         if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
            if(!running) {
                running = true;
                var localroute ="{!!route('api.hardware.list', ['Requestable' , 'withImages' => 'true', 'limit' => '50', 'offset' => 'offsetPH'])!!}";
                $.getJSON( localroute.replace("offsetPH", page * 50), function(data) {
                var template = $.templates("#post-template");
                var htmlOutput = template.render(data.rows);
                $("#items").isotope( 'insert', $(htmlOutput));
                $("#items").isotope('layout');
                page++;
                running = false;
>>>>>>> Some more work on the isotope layout
            
                });
            }
       } 
    });
<<<<<<< 1acec5d7226355ce0c6049cb6be3eb8710e34f05
>>>>>>> More work on isotoping.  Pull images from api and lazy load.

    $("#search").blur(function() {
        if($(this).val() == "") {
            $(this).val("Search...").addClass("empty");
        }
    });

=======
    
    var filter ="";
    //Search
    $("#search").val("Search...").addClass("empty");
    
    $("#search").focus(function(){
        if($(this).val() == "Search...") {
            $(this).val("").removeClass("empty");
        }
    });
    
    $("#search").blur(function() {
        if($(this).val() == "") {
            $(this.val("Search...").addClass("empty"));
        }
    });
    
>>>>>>> Some more work on the isotope layout
    $("#search-submit").click(function(){
        var searchText = $("#search").val();
        if (searchText == "Search...")
            searchText = "";
        filter = searchText;
<<<<<<< 1acec5d7226355ce0c6049cb6be3eb8710e34f05

=======
>>>>>>> Some more work on the isotope layout
        // Clear Current items
        var $items = $('#items');
        var $elems = $items.isotope("getItemElements");
        $items.isotope('remove', $elems);
<<<<<<< 1acec5d7226355ce0c6049cb6be3eb8710e34f05

        //Add our filter and relayout
        jsonSearch = filter;
        jsonOffset = 0;
        generateIsotopeFromJsonLink();
    });
=======
            
        var localroute ="{!!route('api.hardware.list', ['Requestable' , 'withImages' => 'true', 'limit' => '50', 'search' => 'searchPH'])!!}";
        $.getJSON( localroute.replace("searchPH", filter), function(data) {
            var template = $.templates("#post-template");
            var htmlOutput = template.render(data.rows);
            $("#items").isotope( 'insert', $(htmlOutput));
            $("#items").isotope('layout');
    });
});
>>>>>>> Some more work on the isotope layout

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
