Ext.define('Grubm.plugin.ListPaging', {
  override: 'Ext.plugin.ListPaging',
  
  config: {
    loadTpl: '<div class="{cssPrefix}list-paging-msg {extraCss}">{message}</div>'
  },
  
  /**
   * @private
   */
  onStoreLoad: function(store) {
    var loadCmp  = this.addLoadMoreCmp(),
        template = this.getLoadTpl(),
        message  = this.storeFullyLoaded() ? this.getNoMoreRecordsText() : this.getLoadMoreText();

    this.getLoadMoreCmp().show();
    this.setLoading(false);

    //restores scroll position after a Store load
    if (this.scrollY) {
      this.getScroller().scrollTo(null, this.scrollY);
      delete this.scrollY;
    }

    //if we've reached the end of the data set, switch to the noMoreRecordsText
    loadCmp.setHtml(template.apply({
      cssPrefix: Ext.baseCSSPrefix,
      extraCss: this.storeFullyLoaded() ? Ext.baseCSSPrefix + 'list-paging-no-more' : '',
      message: message
    }));
  }
})