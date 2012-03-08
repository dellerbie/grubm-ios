Ext.define('Grubm.view.Overlay', {
  extend: 'Ext.Component',
  singleton: true,
  container: null,
  loadingContainer: null,
  createLoadingOverlay: function(msg) {
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
  
  createOverlay: function(msg) {
    return '<div class="x-mask-inner">' + 
        		  '<div class="x-mask-message">' + 
        			  msg + 
        		  '</div>' + 
      	  '</div>'
  },
  
  show: function(msg, panel, loading) {
    var container = loading ? this.loadingContainer : this.container;
    panel = panel || Ext.Viewport;
    
    if(!container) {
      var id = loading ? 'grubm-loading-overlay' : 'grubm-overlay';
      var overlay = loading ? this.createLoadingOverlay : this.createOverlay;
      
      container = Ext.DomHelper.insertFirst(panel.element, {id: id, cls: 'x-mask'}, true);
      Ext.DomHelper.append(container, overlay(msg), true);
      if(loading) {
        this.loadingContainer = container;
      } else {
        this.container = container;
      }
    } else {
      Ext.DomHelper.overwrite(container.select('.x-mask-message').elements[0], msg);
    }
    
    panel.on({
      scope: this,
      resize: function() { this.refreshPosition(panel, container) }
    })
    
    panel.un({
      scope: this,
      resize: function() { this.refreshPosition(panel, container) }
    });
    
    container.show();
    this.refreshPosition(panel, container);
    
    var autoHideTime = loading ? 30000 : 2500;
    var task = new Ext.util.DelayedTask(function() {
      if(loading) {
        this.hideLoading();
      } else {
        this.hide();
      }
    }, this);
    task.delay(autoHideTime); // auto-hide the overlay in 30 seconds, no matter what.
  },
  
  hide: function(loading) {
    var overlay = loading ? Ext.fly('grubm-loading-overlay') : Ext.fly('grubm-overlay');
    if(overlay) {
      overlay.hide();
    }
  },
  
  showLoading: function(msg, panel) {
    this.show(msg, panel, true);
  },
  
  hideLoading: function() {
    this.hide(true);
  },
  
  refreshPosition: function(panel, overlayContainer) {
    var scrollable = panel.getScrollable(),
        scroller = (scrollable) ? scrollable.getScroller() : null,
        offset = (scroller) ? scroller.position : { x: 0, y: 0 },
        parentSize = panel.element.getSize(),
        innerSize = overlayContainer.getSize();

    overlayContainer.setStyle({
      marginTop: Math.round((parentSize.height - innerSize.height + (offset.y * 2)) / 2) + 'px',
      marginLeft: Math.round((parentSize.width - innerSize.width + offset.x) / 2) + 'px'
    });
  }
});