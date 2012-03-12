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
    
    if(loading) {
      if(this.container) {
        this.container.hide();
      }
      this.loadingContainer.show();
    } else {
      if(this.loadingContainer) {
        this.loadingContainer.hide();
      }
      this.container.show();
    }
    
    this.refreshPosition(panel, container);
    
    var autoHideTime = loading ? 90000 : 3000;
    if(this.autoHideTask) {
      this.autoHideTask.cancel();
      this.autoHideTask = null;
    }
    
    this.autoHideTask = new Ext.util.DelayedTask(function() {
      if(loading) {
        this.hideLoading();
      } else {
        this.hide();
      }
    }, this);
    this.autoHideTask.delay(autoHideTime); // auto-hide the overlay in 30 seconds, no matter what.
  },
  
  hide: function(loading) {
    var overlay = loading ? Ext.get('grubm-loading-overlay') : Ext.get('grubm-overlay');
    if(overlay && !overlay.isStyle('display', 'none')) {
      overlay.hide();
      if(this.autoHideTask) {
        this.autoHideTask.cancel();
        this.autoHideTask = null;
      }
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