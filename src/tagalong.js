//http://codr.cc/ee4ece/js
/**
 * Copyright (c) 2011 Chris Gutierrez, http://jquery.com/
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
;(function($) {

  function Tagalong(opts) {

    this.opts = $.extend({
        article_selector: 'article',
        aside_selector: 'aside'
    }, opts || {});

    this.update_cache();
    $(window).on('scroll', this.scroll_handler);
  }

  Tagalong.prototype.update_cache() {
    this.cache = [];

    var $articles = $(this.opts.article_selector),
        total_articles = $articles.size(),
        $article,
        $aside;

    for (var i = 0; i < total_articles; i++) {

      $article = $articles.filter(':eq(' + i + ')'),
      $aside = $article.find(this.opts.aside_selector);

      $article.css({ position: 'relative' });
      $aside.css({ position: 'absolute', top: '0px', bottom:'' });

      this.cache.push({
        article: {
          $elem: $article,
          height: $article.height(),
          offset: $article.offset(),
          topPadding: $article.css('paddingTop'),
          bottomPadding: $article.css('paddingBottom')
        },
        aside: {
          $elem: $aside,
          height: $aside.outerHeight(true)
        }
      });
    }
  }

  Tagalong.prototype.scroll_handler = function() {

    var scroll_top = $(this).scrollTop(),
        article,
        aside,
        article_top,
        css;

    for(var i = 0; i < articles_cache.length; i++) {
      article = articles_cache[i].article;
      aside = articles_cache[i].aside;
      article_top = article.offset.top - scroll_top;
      css = { };

      if (article_top + (article.height - aside.height) <= 0) {
        css = { position: 'absolute', top: '', bottom: article.bottomPadding };
      } else if (article_top < 0) {
        css = { position: 'fixed', top: article.topPadding, bottom: '' };
      } else {
        css = { position: 'absolute', top: article.topPadding, bottom: '' };
      }

      aside.$elem.css(css);
    }
  }

  $.tagalong = function(opts) {
    return new Tagalong(opts);
  }

})(jQuery);