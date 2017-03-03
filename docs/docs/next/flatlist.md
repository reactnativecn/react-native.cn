A performant interface for rendering simple, flat lists, supporting the most handy features:

- Fully cross-platform.
- Optional horizontal mode.
- Configurable viewability callbacks.
- Header support.
- Footer support.
- Separator support.
- Pull to Refresh.
- Scroll loading.
- If you need section support, use <SectionList>.

Minimal Example:

```javascript
<FlatList
  data={[{key: 'a'}, {key: 'b'}]}
  renderItem={({item}) => <Text>{item.key}</Text>}
/>
```

This is a convenience wrapper around <VirtualizedList>, and thus inherits the following caveats:

- Internal state is not preserved when content scrolls out of the render window. Make sure all your data is captured in the item data or external stores like Flux, Redux, or Relay.
- In order to constrain memory and enable smooth scrolling, content is rendered asynchronously offscreen. This means it's possible to scroll faster than the fill rate ands momentarily see blank content. This is a tradeoff that can be adjusted to suit the needs of each application, and we are working on improving it behind the scenes.
- By default, the list looks for a key prop on each item and uses that for the React key. Alternatively, you can provide a custom keyExtractor prop.

### 属性

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="footercomponent"></a>FooterComponent?: <span
            class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                           href="docs/flatlist.html#footercomponent">#</a>
    </h4>
        <div><p>Rendered at the bottom of all the items.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="headercomponent"></a>HeaderComponent?: <span
            class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                           href="#headercomponent">#</a>
    </h4>
        <div><p>Rendered at the top of all the items.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="separatorcomponent"></a>SeparatorComponent?: <span
            class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                           href="#separatorcomponent">#</a>
    </h4>
        <div><p>Rendered in between each item, but not at the top or bottom.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="columnwrapperstyle"></a>columnWrapperStyle?: <span
            class="propType"><code>StyleObj</code></span> <a class="hash-link"
                                                             href="#columnwrapperstyle">#</a></h4>
        <div><p>Optional custom style for multi-item rows generated when numColumns &gt; 1</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="data"></a>data: <span class="propType"><code>?Array&lt;ItemT&gt;</code></span>
        <a class="hash-link" href="#data">#</a></h4>
        <div><p>For simplicity, data is just a plain array. If you want to use something else, like an
            immutable list, use the underlying <code>VirtualizedList</code> directly.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getitem"></a>getItem?: <a class="hash-link"
                                                                                              href="#getitem">#</a>
    </h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getitemcount"></a>getItemCount?: <a
            class="hash-link" href="#getitemcount">#</a></h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getitemlayout"></a>getItemLayout?: <span
            class="propType"><code>(data: ?Array&lt;ItemT&gt;, index: number) =&gt;
  {length: number, offset: number, index: number}</code></span> <a class="hash-link"
                                                                   href="#getitemlayout">#</a></h4>
        <div><p><code>getItemLayout</code> is an optional optimizations that let us skip measurement of dynamic content
            if
            you know the height of items a priori. <code>getItemLayout</code> is the most efficient, and is easy to
            use if you have fixed height items, for example:</p>
            <div class="prism language-javascript">getItemLayout<span class="token operator">=</span><span
                    class="token punctuation">{</span><span class="token punctuation">(</span>data<span
                    class="token punctuation">,</span> index<span class="token punctuation">)</span> <span
                    class="token operator">=</span><span class="token operator">&gt;</span> <span
                    class="token punctuation">(</span>
                <span class="token punctuation">{</span>length<span class="token punctuation">:</span> ITEM_HEIGHT<span
                        class="token punctuation">,</span> offset<span class="token punctuation">:</span> ITEM_HEIGHT
                <span class="token operator">*</span> index<span class="token punctuation">,</span> index<span
                        class="token punctuation">}</span>
                <span class="token punctuation">)</span><span class="token punctuation">}</span></div>
            <p>Remember to include separator length (height or width) in your offset calculation if you
                specify <code>SeparatorComponent</code>.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="horizontal"></a>horizontal?: <span class="propType"><code>?boolean</code></span>
        <a class="hash-link" href="#horizontal">#</a></h4>
        <div><p>If true, renders items next to each other horizontally instead of stacked vertically.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="keyextractor"></a>keyExtractor: <span
            class="propType"><code>(item: ItemT, index: number) =&gt; string</code></span> <a class="hash-link"
                                                                                              href="#keyextractor">#</a>
    </h4>
        <div><p>Used to extract a unique key for a given item at the specified index. Key is used for caching
            and as the react key to track item re-ordering. The default extractor checks <code>item.key</code>, then
            falls back to using the index, like React does.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="legacyimplementation"></a>legacyImplementation?:
        <span class="propType"><code>?boolean</code></span> <a class="hash-link"
                                                               href="#legacyimplementation">#</a></h4>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="numcolumns"></a>numColumns: <span
            class="propType"><code>number</code></span> <a class="hash-link" href="#numcolumns">#</a>
    </h4>
        <div><p>Multiple columns can only be rendered with <code>horizontal={false}`` and will zig-zag like a</code>flexWrap`
            layout. Items should all be the same height - masonry layouts are not supported.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onendreached"></a>onEndReached?: <span
            class="propType"><code>?(info: {distanceFromEnd: number}) =&gt; void</code></span> <a class="hash-link"
                                                                                                  href="#onendreached">#</a>
    </h4>
        <div><p>Called once when the scroll position gets within <code>onEndReachedThreshold</code> of the rendered
            content.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onendreachedthreshold"></a>onEndReachedThreshold?:
        <span class="propType"><code>?number</code></span> <a class="hash-link"
                                                              href="#onendreachedthreshold">#</a></h4>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onrefresh"></a>onRefresh?: <span
            class="propType"><code>?() =&gt; void</code></span> <a class="hash-link"
                                                                   href="#onrefresh">#</a></h4>
        <div><p>If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make
            sure to also set the <code>refreshing</code> prop correctly.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onviewableitemschanged"></a>onViewableItemsChanged?:
        <span class="propType"><code>?(info: {viewableItems: Array&lt;ViewToken&gt;, changed: Array&lt;ViewToken&gt;}) =&gt; void</code></span>
        <a class="hash-link" href="#onviewableitemschanged">#</a></h4>
        <div><p>Called when the viewability of rows changes, as defined by the
            <code>viewablePercentThreshold</code> prop.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="refreshing"></a>refreshing?: <span class="propType"><code>?boolean</code></span>
        <a class="hash-link" href="#refreshing">#</a></h4>
        <div><p>Set this true while waiting for new data from a refresh.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="renderitem"></a>renderItem: <span
            class="propType"><code>(info: {item: ItemT, index: number}) =&gt; ?React.Element&lt;any&gt;</code></span> <a
            class="hash-link" href="#renderitem">#</a></h4>
        <div><p>Takes an item from <code>data</code> and renders it into the list. Typical usage:</p>
            <div class="prism language-javascript">_renderItem <span class="token operator">=</span> <span
                    class="token punctuation">(</span><span class="token punctuation">{</span>item<span
                    class="token punctuation">}</span><span class="token punctuation">)</span> <span
                    class="token operator">=</span><span class="token operator">&gt;</span> <span
                    class="token punctuation">(</span>
                &lt;TouchableOpacity onPress<span class="token operator">=</span><span
                        class="token punctuation">{</span><span class="token punctuation">(</span><span
                        class="token punctuation">)</span> <span class="token operator">=</span><span
                        class="token operator">&gt;</span> <span class="token keyword">this</span><span
                        class="token punctuation">.</span><span class="token function">_onPress<span
                        class="token punctuation">(</span></span>item<span class="token punctuation">)</span><span
                        class="token punctuation">}</span><span class="token operator">&gt;</span>
                &lt;Text<span class="token operator">&gt;</span><span class="token punctuation">{</span>item<span
                        class="token punctuation">.</span>title<span class="token punctuation">}</span><span
                        class="token punctuation">}</span>&lt;<span class="token operator">/</span>Text<span
                        class="token operator">&gt;</span>
                &lt;TouchableOpacity<span class="token operator">/</span><span class="token operator">&gt;</span>
                <span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">.</span><span class="token punctuation">.</span><span
                        class="token punctuation">.</span>
                &lt;FlatList data<span class="token operator">=</span><span class="token punctuation">{</span><span
                        class="token punctuation">[</span><span class="token punctuation">{</span>title<span
                        class="token punctuation">:</span> <span class="token string">'Title Text'</span><span
                        class="token punctuation">,</span> key<span class="token punctuation">:</span> <span
                        class="token string">'item1'</span><span class="token punctuation">}</span><span
                        class="token punctuation">]</span><span class="token punctuation">}</span> renderItem<span
                        class="token operator">=</span><span class="token punctuation">{</span><span
                        class="token keyword">this</span><span class="token punctuation">.</span>_renderItem<span
                        class="token punctuation">}</span> <span class="token operator">/</span><span
                        class="token operator">&gt;</span></div>
            <p>Provides additional metadata like <code>index</code> if you need it.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="shoulditemupdate"></a>shouldItemUpdate: <span
            class="propType"><code>(
  prevInfo: {item: ItemT, index: number},
  nextInfo: {item: ItemT, index: number}
) =&gt; boolean</code></span> <a class="hash-link" href="#shoulditemupdate">#</a></h4>
        <div><p>Optional optimization to minimize re-rendering items.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="viewabilityconfig"></a>viewabilityConfig?: <span
            class="propType"><code>ViewabilityConfig</code></span> <a class="hash-link"
                                                                      href="#viewabilityconfig">#</a>
    </h4>
        <div><p>See <code>ViewabilityHelper</code> for flow type and further documentation.</p></div>
    </div>
</div>

### 方法

<div class="props">
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="scrolltoend"></a>scrollToEnd<span
            class="methodType">(params?: object)</span> <a class="hash-link" href="#scrolltoend">#</a>
    </h4>
        <div><p>Scrolls to the end of the content. May be janky without <code>getItemLayout</code> prop.</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="scrolltoindex"></a>scrollToIndex<span
            class="methodType">(params: object)</span> <a class="hash-link"
                                                          href="#scrolltoindex">#</a></h4>
        <div><p>Scrolls to the item at a the specified index such that it is positioned in the viewable area
            such that <code>viewPosition</code> 0 places it at the top, 1 at the bottom, and 0.5 centered in the
            middle.</p>
            <p>May be janky without <code>getItemLayout</code> prop.</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="scrolltoitem"></a>scrollToItem<span
            class="methodType">(params: object)</span> <a class="hash-link" href="#scrolltoitem">#</a>
    </h4>
        <div><p>Requires linear scan through data - use <code>scrollToIndex</code> instead if possible. May be janky
            without <code>getItemLayout</code> prop.</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="scrolltooffset"></a>scrollToOffset<span
            class="methodType">(params: object)</span> <a class="hash-link"
                                                          href="#scrolltooffset">#</a></h4>
        <div><p>Scroll to a specific content pixel offset, like a normal <code>ScrollView</code>.</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="recordinteraction"></a>recordInteraction<span
            class="methodType">()</span> <a class="hash-link" href="#recordinteraction">#</a></h4>
        <div><p>Tells the list an interaction has occured, which should trigger viewability calculations, e.g.
            if <code>waitForInteractions</code> is true and the user has not scrolled. This is typically called by
            taps on items or by navigation actions.</p></div>
    </div>
</div>


### 例子
```javascript
'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
  FlatList,
  StyleSheet,
  View,
} = ReactNative;

const UIExplorerPage = require('./UIExplorerPage');

const infoLog = require('infoLog');

const {
  FooterComponent,
  HeaderComponent,
  ItemComponent,
  PlainInput,
  SeparatorComponent,
  genItemData,
  getItemLayout,
  pressItem,
  renderSmallSwitchOption,
} = require('./ListExampleShared');

const VIEWABILITY_CONFIG = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

class FlatListExample extends React.PureComponent {
  static title = '<FlatList>';
  static description = 'Performant, scrollable list of data.';

  state = {
    data: genItemData(1000),
    debug: false,
    horizontal: false,
    filterText: '',
    fixedHeight: true,
    logViewable: false,
    virtualized: true,
  };
  _onChangeFilterText = (filterText) => {
    this.setState({filterText});
  };
  _onChangeScrollToIndex = (text) => {
    this._listRef.scrollToIndex({viewPosition: 0.5, index: Number(text)});
  };
  componentDidUpdate() {
    this._listRef.recordInteraction(); // e.g. flipping logViewable switch
  }
  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i');
    const filter = (item) => (filterRegex.test(item.text) || filterRegex.test(item.title));
    const filteredData = this.state.data.filter(filter);
    return (
      <UIExplorerPage
        noSpacer={true}
        noScroll={true}>
        <View style={styles.searchRow}>
          <View style={styles.options}>
            <PlainInput
              onChangeText={this._onChangeFilterText}
              placeholder="Search..."
              value={this.state.filterText}
            />
            <PlainInput
              onChangeText={this._onChangeScrollToIndex}
              placeholder="scrollToIndex..."
              style={styles.searchTextInput}
            />
          </View>
          <View style={styles.options}>
            {renderSmallSwitchOption(this, 'virtualized')}
            {renderSmallSwitchOption(this, 'horizontal')}
            {renderSmallSwitchOption(this, 'fixedHeight')}
            {renderSmallSwitchOption(this, 'logViewable')}
            {renderSmallSwitchOption(this, 'debug')}
          </View>
        </View>
        <SeparatorComponent />
        <FlatList
          HeaderComponent={HeaderComponent}
          FooterComponent={FooterComponent}
          SeparatorComponent={SeparatorComponent}
          data={filteredData}
          debug={this.state.debug}
          disableVirtualization={!this.state.virtualized}
          getItemLayout={this.state.fixedHeight ? this._getItemLayout : undefined}
          horizontal={this.state.horizontal}
          key={(this.state.horizontal ? 'h' : 'v') + (this.state.fixedHeight ? 'f' : 'd')}
          legacyImplementation={false}
          numColumns={1}
          onRefresh={this._onRefresh}
          onViewableItemsChanged={this._onViewableItemsChanged}
          ref={this._captureRef}
          refreshing={false}
          renderItem={this._renderItemComponent}
          shouldItemUpdate={this._shouldItemUpdate}
          viewabilityConfig={VIEWABILITY_CONFIG}
        />
      </UIExplorerPage>
    );
  }
  _captureRef = (ref) => { this._listRef = ref; };
  _getItemLayout = (data: any, index: number) => {
    return getItemLayout(data, index, this.state.horizontal);
  };
  _onRefresh = () => alert('onRefresh: nothing to refresh :P');
  _renderItemComponent = ({item}) => {
    return (
      <ItemComponent
        item={item}
        horizontal={this.state.horizontal}
        fixedHeight={this.state.fixedHeight}
        onPress={this._pressItem}
      />
    );
  };
  _shouldItemUpdate(prev, next) {
    /**
     * Note that this does not check state.horizontal or state.fixedheight because we blow away the
     * whole list by changing the key in those cases. Make sure that you do the same in your code,
     * or incorporate all relevant data into the item data, or skip this optimization entirely.
     */
    return prev.item !== next.item;
  }
  // This is called when items change viewability by scrolling into or out of the viewable area.
  _onViewableItemsChanged = (info: {
      changed: Array<{
        key: string, isViewable: boolean, item: any, index: ?number, section?: any
      }>
    }
  ) => {
    // Impressions can be logged here
    if (this.state.logViewable) {
      infoLog('onViewableItemsChanged: ', info.changed.map((v) => ({...v, item: '...'})));
    }
  };
  _pressItem = (key: number) => {
    this._listRef.recordInteraction();
    pressItem(this, key);
  };
  _listRef: FlatList<*>;
}


const styles = StyleSheet.create({
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  searchRow: {
    paddingHorizontal: 10,
  },
});

module.exports = FlatListExample;
```
