var constants = {
  'blackIcon': 'css/images/black.png',
  'blueIcon': 'css/images/blue.png',
  'greenIcon': 'css/images/green.png',
  'indianredIcon': 'css/images/indianred.png',
  'lightorangeIcon': 'css/images/lightorange.png',
  'purpleIcon': 'css/images/purple.png',
  'skyblueIcon': 'css/images/skyblue.png',
  'tealIcon': 'css/images/teal.png',
  'yellowIcon': 'css/images/yellow.png'
};

function setMap() {
  // Set map window
  $("#map").goMap({
      latitude: 46.294705,
      longitude: 14.955139,
      maptype: 'TERRAIN',
      zoom: 8
  });

  <!-- Initialize the plugin: -->
  $('#multiselector').multiselect({
      onChange: function(element, checked) {
        var element2 = element[0].index;
        var checked2 = checked;
        if (checked) {
          $.goMap.showHideMarkerByGroup(element[0].value, true)
        } else {
          $.goMap.showHideMarkerByGroup(element[0].value, false)
        }
      }
  }); 

  $("#btnSelect-toggle").click(function(e) {
      e.preventDefault();
      multiselect_toggle($("#multiselector"), $(this));
  });
}

function setMark(item) {
  // Marker function  
  if (item.position==26) {
    $.goMap.createMarker({
        latitude: item.latitude,
        longitude: item.longitude,
        group: 'goriskaChk',
        icon: constants.blackIcon,
        html: getPeak(item)
    });
  } else if (item.position==1)
  {
    $.goMap.createMarker({
        latitude: item.latitude,
        longitude: item.longitude,
        group: 'julijskeChk',
        icon: constants.blueIcon,
        html: getPeak(item)
    });    
  } else if (item.position==3)
  {
    $.goMap.createMarker({
        latitude: item.latitude,
        longitude: item.longitude,
        group: 'kamniskeChk',
        icon: constants.greenIcon,
        html: getPeak(item)
    });    
  } else if (item.position==11)
  {
    $.goMap.createMarker({
        latitude: item.latitude,
        longitude: item.longitude,
        group: 'karavankeChk',
        icon: constants.indianredIcon,
        html: getPeak(item)
    });    
  } else if (item.position==4)
  {
    $.goMap.createMarker({
        latitude: item.latitude,
        longitude: item.longitude,
        group: 'pohorjeChk',
        icon: constants.lightorangeIcon,
        html: getPeak(item)
    });    
  } else if (item.position==5)
  {
    $.goMap.createMarker({
        latitude: item.latitude,
        longitude: item.longitude,
        group: 'ljubljnaChk',
        icon: constants.purpleIcon,
        html: getPeak(item)
    });    
  } else if (item.position==21)
  {
    $.goMap.createMarker({
        latitude: item.latitude,
        longitude: item.longitude,
        group: 'skofjelokaChk',
        icon: constants.skyblueIcon,
        html: getPeak(item)
    });    
  } else if (item.position==25)
  {
    $.goMap.createMarker({
        latitude: item.latitude,
        longitude: item.longitude,
        group: 'zasavjeChk',
        icon: constants.tealIcon,
        html: getPeak(item)
    });    
  }
}

// HTML data
function getPeak(item) {
    return '<a href=\"'+item.link+'\" target=\"_blank\">'+item.name+'</a>';
}

function multiselect_selected($el) {
    var ret = true;
    $('option', $el).each(function(element) {
      if (!!!$(this).prop('selected')) {
        ret = false;
      }
    });
    return ret;
}

function multiselect_selectAll($el) {
    $('option', $el).each(function(element) {
      $el.multiselect('select', $(this).val());
    });
}

function multiselect_deselectAll($el) {
    $('option', $el).each(function(element) {
      $el.multiselect('deselect', $(this).val());
    });
}

function multiselect_toggle($el, $btn) {
    if (multiselect_selected($el)) {
      multiselect_deselectAll($el);
      $btn.text("Izberi vse");
    }
    else {
      multiselect_selectAll($el);
      $btn.text("Pobriši vse");
    }
}