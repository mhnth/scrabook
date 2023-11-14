import * as cheerio from 'cheerio';

const crawl = {
  baseUrl: 'https://truyenfull.vn/',

  async _getDoc(path: string) {
    try {
      const res = await fetch(this.baseUrl + path, { mode: 'no-cors' });
      // if (!res.ok) return null;

      const html = await res.text();

      return cheerio.load(html);
    } catch (error) {
      console.log('ERROR _getDoc:', error);
      return null;
    }
  },

  async gen(path: string, page = '1') {
    const $ = await this._getDoc(path + '/trang-' + page + '/');

    if ($) {
      const el = $('.list-truyen div[itemscope]');
      const novelList = [];
      const next = $('.pagination a').first().text();
      const current = $('.pagination li.active').text().split(' ')[0];
      for (let i = 0; i < el.length; i++) {
        const e = el[i];
        const cover = $(e).find('[data-image]').attr('data-image');
        const link = $(e)
          .find('.truyen-title > a')
          .first()
          .attr('href')
          ?.slice(22); //"https://truyenfull.vn/".length
        novelList.push({
          name: $(e).find('.truyen-title > a').text(),
          link: link,
          author: $(e).find('.author').text(),
          cover: cover?.replace('=w60-h85-c', ''),
          host: 'https://truyenfull.vn',
        });
      }

      return { novelList: novelList, isNext: !!next, current };
    }

    return null;
  },

  async search(key: string, page = '1') {
    const $ = await this._getDoc(`tim-kiem/?tukhoa=${key}&page=${page}`);

    if ($) {
      let el = $('.list-truyen div[itemscope]');
      let novelList = [];
      let next = $('.pagination > li.active + li').last().text();
      const current = $('.pagination li.active').text().split(' ')[0];
      for (var i = 0; i < el.length; i++) {
        const link = $(e)
          .find('.truyen-title > a')
          .first()
          .attr('href')
          ?.slice(22); //"https://truyenfull.vn/".length

        var e = el.get(i);
        novelList.push({
          name: $(e).find('.truyen-title > a').text(),
          link: link,
          description: $(e).find('.author').text(),
          cover: $(e).find('[data-image]').attr('data-image'),
          author: $(e).find('.author').text(),
          host: 'https://truyenfull.vn',
        });
      }

      return { novelList, current, isNext: !!next };
    }

    return null;
  },

  async getInfo(path: string) {
    const $ = await this._getDoc(path);

    if ($)
      return {
        name: $('h3.title')?.text(),
        cover: $('div.book img')?.attr('src'),
        author: $('div.info div a')?.first().text(),
        description: $('div.desc-text')?.html(),
        details: $('div.info').html()?.replaceAll('</h3>', ' '),
        ongoing: $('div.info').html()?.indexOf('>Đang ra<')! > 0,
        total_page: $('input#total-page').attr('value'),
        host: 'truyenfull.vn',
      };

    return null;
  },

  async getChapsUrl(path: string) {
    const $ = await this._getDoc(path);

    if (!$) return null;

    const chapsUrls = [];
    const cl = $('.list-chapter > li');

    for (let i = 0; i < cl.length; i++) {
      const c = cl[i];

      chapsUrls.push({
        name: $(c).find('a').text(),
        input: $(c).find('a').attr('href'),
      });
    }

    return chapsUrls;
  },

  async getChap(url: string) {
    const $ = await this._getDoc(url);

    if ($) {
      const name = $('a.truyen-title').text();
      const chap = $('span[itemprop=name]').last().text();

      $('noscript')?.remove();
      $('script')?.remove();
      $('iframe')?.remove();
      $('div.ads-responsive')?.remove();
      $('[style=font-size.0px;]').remove();
      $('a').remove();

      let txt = $('div.chapter-c');
      txt.find('p').last().remove();
      let text = txt
        .html()
        ?.replace('<em>.*?Chương này có nội dung ảnh.*?</em>', '</?em>');

      return { text, name, chap };
    }

    return null;
  },
};

export default crawl;
