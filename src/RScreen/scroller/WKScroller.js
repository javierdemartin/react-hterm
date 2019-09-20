// @flow

function __nsEncodeCGSize(width, height) {
  return `{${width}, ${height}}`;
}

export default class WKScroller {
  _viewWidth = 0;
  _viewHeight = 0;
  _contentWidth = 0;
  _contentHeight = 0;

  constructor(callback) {
    this._callback = callback;
  }

  _postMessage(message) {
    let handler = window.webkit.messageHandlers.wkScroller;
    if (handler) {
      handler.postMessage(message);
    } else {
      console.log(message);
    }
  }

  setDimensions(
    viewWidth: number | null,
    viewHeight: number | null,
    contentWidth: number | null,
    contentHeight: number | null
  ) {
    if (viewWidth != null) {
      this._viewWidth = viewWidth;
    }

    if (viewHeight != null) {
      this._viewHeight = viewHeight;
    }
    if (contentWidth != null) {
      this._contentWidth = contentWidth;
    }

    if (contentHeight != null) {
      this._contentHeight = contentHeight;
    }

    this._postMessage({
      op: "resize",
      viewSize: __nsEncodeCGSize(this._viewWidth, this._viewHeight),
      contentSize: __nsEncodeCGSize(this._contentWidth, this._contentHeight)
    });
  }

  reportScroll(x: number, y: number, z: number | undefined) {
    if (this._callback) {
      this._callback(x, y, z);
    }
  }
  scrollTo(x, y, animated) {
    this._postMessage({ op: "scrollTo", x, y, animated });
  }
}