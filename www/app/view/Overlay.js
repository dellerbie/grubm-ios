Ext.define('Grubm.view.Overlay', {
  singleton: true,
  container: null,
  createOverlay: function(msg) {
    return '<div class="x-mask-inner">' + 
		  '<div class="x-loading-spinner-outer">' + 
			  '<div class="x-loading-spinner">' + 
			    '<span class="x-loading-top"></span>' + 
			    '<span class="x-loading-right"></span>' + 
			    '<span class="x-loading-bottom"></span>' + 
			    '<span class="x-loading-left"></span>' +
			  '</div>' + 
		  '</div>' + 
		  '<div class="x-mask-message">' + 
			  msg + 
		  '</div>' + 
	  '</div>'
  },
  
  show: function(msg, panel) {
    if(!this.container) {
      this.container = Ext.DomHelper.insertFirst(panel.element, {id:'grubm-overlay', cls: 'x-mask'}, true);
      Ext.DomHelper.append(this.container, this.createOverlay(msg), true);
    } else {
      Ext.DomHelper.overwrite(this.container.select('.x-mask-message').elements[0], msg);
    }
    
    panel.on({
      scope: this,
      resize: function() { this.refreshPosition(panel) }
    })
    
    panel.un({
      scope: this,
      resize: function() { this.refreshPosition(panel) }
    });
    
    this.refreshPosition(panel);
    this.container.show();
    var task = new Ext.util.DelayedTask(function() {
      this.hide();
    }, this);
    task.delay(30000);
  },
  
  hide: function() {
    var overlay = Ext.fly('grubm-overlay');
    if(overlay) {
      overlay.hide();
    }
  },
  
  refreshPosition: function(panel) {
    var scrollable = panel.getScrollable(),
        scroller = (scrollable) ? scrollable.getScroller() : null,
        offset = (scroller) ? scroller.position : { x: 0, y: 0 },
        parentSize = panel.element.getSize(),
        innerSize = this.container.getSize();

    this.container.setStyle({
      marginTop: Math.round((parentSize.height - innerSize.height + (offset.y * 2)) / 2) + 'px',
      marginLeft: Math.round((parentSize.width - innerSize.width + offset.x) / 2) + 'px'
    });
  }
});