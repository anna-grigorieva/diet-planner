ko.extenders.numeric = function (target) {
    var computedValue = ko.pureComputed({
        read: target,
        write: function (value) {
            if (!isFinite(value)) {
                target.notifySubscribers('');
            } else {
                target(value);
            }
        }
    }).extend({ notify: 'always' });
    return computedValue;
};

ko.bindingHandlers.popover = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();
        $(element)
            .on('mouseover', function () {
                $(this).popover('show');
            })
            .on('mouseout', function () {
                $(this).popover('hide');
            })
            .popover({
                content: value,
            });
    }
};

ko.bindingHandlers.select = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();

        $(element).datepicker({
            'showOn': 'button',
            'buttonImage': "css/images/ico_calendar.png",
            'dateFormat': 'dd/mm/yy,  DD',
            'onSelect': function () {
                value(formatDate($(this).datepicker("getDate")));
            }
        });

        $(element).datepicker("setDate", new Date());
        value(formatDate($(element).datepicker("getDate")));
    }
};

function formatDate(date) {
    var
        days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dd = date.getDate(),
        mm = date.getMonth() + 1,
        yy = date.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return days[date.getDay()] + ', ' + dd + '/' + mm + '/' + yy;
}