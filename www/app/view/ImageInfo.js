Ext.define('Grubm.view.ImageInfo', {
	extend: 'Ext.Component',
  xtype: 'imageinfo',
  config: {
  	tpl: new Ext.XTemplate(
  	  '<div class="time">{[this.timeAgoInWords(values.created_at)]}</div>',
      '<div class="image" style="background: url({url}) no-repeat;"></div>',
      '<span class="what">&quot;{description}&quot;</span>',
      {
        timeAgoInWords: function(date) {
          try {
            var now = Math.ceil(Number(new Date()) / 1000),
                dateTime = Math.ceil(Number(date) / 1000),
                diff = now - dateTime,
                str;

            if (diff < 0) diff = -diff;

            if (diff < 86400) {
              return 'Today';
            } else if (diff < 60*60*24*365) {
              str = String(Math.ceil(diff / (60 * 60 * 24)));
              return str + (str == "1" ? ' day' : ' days') + ' ago';
            } else {
              return Ext.Date.format(new Date(date), 'jS M \'y');
            }
          } catch(e) {
            return '';
          }
        }
      }
    )
  }
});