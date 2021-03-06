﻿/**
FirelambFormCopy
@Version 1.0.2
@UpdateDate: 2014-07-25
@Url 
@Author: Firelamb
@Email:firelamb@qq.com
**/
(function ($) {
    var defaults = {
        formTo: "" + $("body button").first() + "",//把form复制到指定的selector选择器上如a,button,.nav,#btnlogin...
        formId: "",//需要复制的表单的id
        triggerEventType: "click",//触发表单复制的事件类型，如click,change,blur,focus等
        copyType: "after"//复制的类型 如after则是把表单复制到指定selector选择器的后边,append则是把form放在指定selector选择器内部
        //还可使用append,before
        , callBack: function () {

        }//复制表单之后的回调函数
    };

    var methods = {

        recover: function () {

            if ($("body").data("FirelambFormCopy") != undefined) {

                var i = $("body").data("FirelambFormCopy").formIndex;
                var $formParent = $("body").data("FirelambFormCopy").formParent;


                var $form = $("body").data("FirelambFormCopy").formId;

                if ($formParent.children().length > 1)//the form parent maybe has more than 2 children(the form and the other at least)
                {
                    var $child = $formParent.children().eq(i - 1)
                    $($child).after($($form));
                }
                else//the form is the only child
                {
                    $($formParent).append($($form));
                }
                $("body").removeData("FirelambFormCopy");

            }
            return this;
        },
        //copy the form to the selector
        copy: function (options) {

            var opts = $.extend({}, defaults, options || {});


            $(this).on(opts.triggerEventType, function () {


                var $form = $(opts.formId);
                var $formParent = $($form).parent();

                var formIndex = $form.index();


                //use the jQuery data to save the form Orginal index and the Form parent
                $("body").data("FirelambFormCopy", {
                    formId: opts.formId,
                    formIndex: formIndex,
                    formParent: $formParent
                });

                var $formTo = $(opts.formTo);

                var type = opts.copyType;

                switch (type) {
                    case "after":
                        //$(opts.formTo).after($(this));
                        $(opts.formTo).after($($form));
                        break;
                    case "append":
                        $($formTo).append($($form));
                        break;
                    case "before":
                        $($formTo).before($($form));
                        break;
                }
                opts.callBack();
            });


            return this;
        }
    };


    $.fn.FirelambFormCopy = function (options) {
        var method = arguments[0];

        var opts = $.extend({}, defaults, options || {});


        // 检验方法是否存在
        if (methods[method]) {
            // 如果方法存在，存储起来以便使用
            // 注意：我这样做是为了等下更方便地使用each（）
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
            // 如果方法不存在，检验对象是否为一个对象（JSON对象）或者method方法没有被传入
        } else if (typeof method === "object" || !method) {
            // 如果我们传入的是一个对象参数，或者根本没有参数，init方法会被调用
            method = methods.init;
        } else {
            // 如果方法不存在或者参数没传入，则报出错误。需要调用的方法没有被正确调用
            $.error("Method" + method + "does not exist on jQuery.pluginName");
            return this;
        }

        // 调用我们选中的方法
        // 再一次注意我们是如何将each（）从这里转移到每个单独的方法上的
        return method.apply(this, arguments);
    };
})(jQuery);