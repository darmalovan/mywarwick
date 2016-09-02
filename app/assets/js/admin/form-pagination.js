import $ from 'jquery';
import 'jquery-form/jquery.form.js';
import log from 'loglevel';

const SPLIT_FORM = 'form.split-form';

$(SPLIT_FORM).each((i, form) => {
  const $form = $(form);

  function getHashNum() {
    return parseInt(location.hash.substring(1), 10);
  }

  let currentPage = getHashNum() || 0;

  function showSection(num) {
    history.replaceState({ pageNum: num }, location.href);
    currentPage = num;
    const $section = $form.find(`section:eq(${num})`);
    $form.find('section.active').removeClass('active');
    $section.addClass('active');
  }

  function pushSection(num) {
    history.pushState({ pageNum: num }, location.href);
    showSection(num);
  }

  $form.find('section:not(:last)')
    .append('<button class="btn btn-primary next pull-right">Next</button>');
  $form.find('section:not(:first)')
    .append('<button type="button" class="btn btn-default back pull-left">Back</button>');

  showSection(currentPage);

  function validate() {
    const formAction = $form.attr('action');

    return new Promise((resolve, reject) =>
      $form.ajaxSubmit({
        url: `${formAction}/validate`,
        success: resolve,
        error: reject,
        resetForm: false,
      })
    );
  }

  function hasErrors() {
    return $form.find(`section:eq(${currentPage}) .has-error`).length > 0;
  }

  function replaceFormGroups(html) {
    $(html).find(`section:eq(${currentPage}) .form-group[id]`).each((j, group) => {
      $form.find(`#${group.id}`).replaceWith(group);
    });

    $(document).trigger('start:replace');
  }

  $('button.next').on('click', function onClick(e) {
    e.preventDefault();

    const $button = $(this).prop('disabled', true);

    validate()
      .then(html => {
        replaceFormGroups(html);

        if (!hasErrors()) {
          pushSection(currentPage + 1);
        }
      })
      .catch(ex => log.error(ex))
      .then(() => $button.prop('disabled', false));
  });

  window.onpopstate = e => {
    if (e.state !== null) {
      showSection(e.state.pageNum);
    }
  };

  $('button.back').on('click', () => {
    pushSection(currentPage - 1);
  });

  $form.on('submit', () => {
    validate()
      .then(html => {
        replaceFormGroups(html);

        if (!hasErrors()) {
          $form.off().submit();
        }
      })
      .catch(e => log.error(e));
    return false;
  });
});
