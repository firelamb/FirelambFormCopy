$(document).ready(function () {

  
    //$("#demoButton").on("click", function () {
    $("#demoButton").FirelambFormCopy('copy', {
        formTo: "#demoButton"
        ,formId:"#coyform"        
        });
    //});

    $("#demoButton1").FirelambFormCopy('copy', {
        formTo: "#divTo1"
          , formId: "#coyform"
        , triggerEventType: "click"
            ,copyType:"append"
    });

    $("#demoButton2").FirelambFormCopy('copy', {
        formTo: "#demoButton2"
      , formId: "#coyform"
           , copyType: "before"
    });

    $("#demoButton4").on("click", function () {
        $("#demoButton4").FirelambFormCopy('recover');
    });
   

});