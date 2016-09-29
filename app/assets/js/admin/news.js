import $ from 'jquery';
import './datetimepicker';
import './form-pagination';
import './audience-estimate';
import log from 'loglevel';

const NEWS_ITEM = '.news-item';

$('input[name="item.publishDateSet"]').on('change', function onChange() {
  const showDateField = $(this).filter(':checked').val() === 'true';

  $(this).parents('.form-group').next().toggle(showDateField);
}).trigger('change');

function populateNewsAnalytics(data) {
  $(NEWS_ITEM).each((i, e) => {
    const id = e.id;
    const $elem = $(e);

    let guestClicksCount = 0;
    let usersClicksCount = 0;
    if (data[id]) {
      guestClicksCount = data[id].guests;
      usersClicksCount = data[id].users;
    }

    let msgForGuestClicks = '';
    switch (guestClicksCount) {
      case 1:
        msgForGuestClicks = `${guestClicksCount} guest`;
        break;
      case 0:
        msgForGuestClicks = `${guestClicksCount} guest`;
        break;
      default:
        msgForGuestClicks = `${guestClicksCount} guests`;
    }

    let msgForUserClicks = '';
    switch (usersClicksCount) {
      case 1:
        msgForUserClicks = `${usersClicksCount} user`;
        break;
      case 0:
        msgForUserClicks = '0 user';
        break;
      default:
        msgForUserClicks = `${usersClicksCount} users`;
    }

    $elem.find('.click-count').text(`Clicked by ${msgForGuestClicks} ${msgForUserClicks}`);
  });
}

/*
 * Handles delete confirmation
 */
$(`${NEWS_ITEM}, .activity-item`).each((i, item) => {
  const $item = $(item);
  const $delete = $item.find('a.delete');
  const $cancel = $item.find('.confirm-delete > button.cancel');

  $delete.on('click', e => {
    e.preventDefault();
    const $toolbar = $(e.currentTarget).parent('.btn-toolbar');
    const $confirmToolbar = $toolbar.siblings('.confirm-delete');
    // TODO: make this less shit
    $toolbar.animate({ right: '25%', opacity: 0 }).hide();
    $confirmToolbar.show().animate({ left: '0%', opacity: 1 });
  });

  $cancel.on('click', e => {
    e.preventDefault();
    const $confirmToolbar = $(e.currentTarget).parent('.confirm-delete');
    const $toolbar = $confirmToolbar.siblings('.btn-toolbar');
    // TODO: make this less shit
    $confirmToolbar.animate({ left: '25%', opacity: 0 }).hide();
    $toolbar.show().animate({ right: '0%', opacity: 1 });
  });
});

if ($(NEWS_ITEM).length) {
  $.ajax({
    url: '/api/news/analytics',
    type: 'POST',
    data: JSON.stringify({ ids: $.map($('.news-item'), e => e.id) }),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: data => populateNewsAnalytics(data),
    error: (xhr, status) => {
      $(`${NEWS_ITEM} .click-count`).empty();
      log.error(`${status}: ${xhr}`);
    },
  });
}
