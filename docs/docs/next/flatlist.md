高性能的简单列表组件，支持下面这些常用的功能：

- 完全跨平台。
- 支持水平布局模式。
- 行组件显示或隐藏时可配置回调事件。
- 支持单独的头部组件。
- 支持单独的尾部组件。
- 支持自定义行间分隔线。
- 支持下拉刷新。
- 支持上拉加载。
- 支持跳转到指定行（ScrollToIndex）。


如果需要分组/类/区（section），请使用[`<SectionList>`](sectionlist.html)。


一个最简单的例子：

```javascript
<FlatList
  data={[{key: 'a'}, {key: 'b'}]}
  renderItem={({item}) => <Text>{item.key}</Text>}
/>
```

下面是一个较复杂的例子，其中演示了如何利用`PureComponent`来进一步优化性能和减少bug产生的可能。 

- By binding the `onPressItem` handler, the props will remain `===` and `PureComponent` will prevent wasteful re-renders unless the actual `id`, `selected`, or `title` props change, even if the inner `SomeOtherWidget` has no such optimizations.
- By passing `extraData={this.state}` to `FlatList` we make sure `FlatList` itself will re-render when the `state.selected` changes. Without setting this prop, `FlatList` would not know it needs to re-render any items because it is also a `PureComponent` and the prop comparison will not show any changes.
- `keyExtractor` tells the list to use the ids for the react keys.

```javascript
class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <SomeOtherWidget
        {...this.props}
        onPress={this._onPress}
      />
    )
  }
}

class MyList extends React.PureComponent {
  state = {selected: (new Map(): Map<string, boolean>)};

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !state.get(id)); // toggle
      return {selected};
    });
  };

  _renderItem = ({item}) => (
    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
```

本组件实质是基于[`<VirtualizedList>`](virtualizedlist.html)组件的封装，因此也有下面这些需要注意的事项：

- 当某行滑出渲染区域之外后，其内部状态将不会保留。请确保你在行组件以外的地方保留了数据。
- 为了优化内存占用同时保持滑动的流畅，列表内容会在屏幕外异步绘制。这意味着如果用户滑动的速度超过渲染的速度，则会先看到空白的内容。这是为了优化不得不作出的妥协，而我们也在设法持续改进。
- This is a `PureComponent` which means that it will not re-render if `props` remain shallow-equal. Make sure that everything your `renderItem` function depends on is passed as a prop that is not `===` after updates, otherwise your UI may not update on changes. This includes the `data` prop and parent component state.
- 默认情况下每行都需要提供一个不重复的key属性。你也可以提供一个`keyExtractor`函数来生成key。

NOTE: `removeClippedSubviews` might not be necessary and may cause bugs. If you see issues with content not rendering, e.g when using `LayoutAnimation`, try setting `removeClippedSubviews={false}`, and we may change the default in the future after more experimentation in production apps.

### 属性

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="itemseparatorcomponent"></a>ItemSeparatorComponent?: <span
            class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                           href="#itemseparatorcomponent">#</a>
    </h4>
        <div><p>行与行之间的分隔线组件。不会出现在第一行之前和最后一行之后。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="listfootercomponent"></a>ListFooterComponent?: <span
            class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                           href="#listfootercomponent">#</a>
    </h4>
        <div><p>尾部组件</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="listheadercomponent"></a>ListHeaderComponent?: <span
            class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                           href="#listheadercomponent">#</a>
    </h4>
        <div><p>头部组件</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="columnwrapperstyle"></a>columnWrapperStyle?: <span
            class="propType"><code>StyleObj</code></span> <a class="hash-link"
                                                             href="#columnwrapperstyle">#</a></h4>
        <div><p>如果设置了多列布局（即将<code>numColumns</code>值设为大于1的整数），则可以额外指定此样式作用在每行容器上。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="data"></a>data: <span class="propType"><code>?Array&lt;ItemT&gt;</code></span>
        <a class="hash-link" href="#data">#</a></h4>
        <div><p>为了简化起见，data属性目前只支持普通数组。如果需要使用其他特殊数据结构，例如immutable数组，请直接使用更底层的<code>VirtualizedList</code>组件。</p></div>
    </div>
       <div class="prop">
       <h4 class="propTitle"><a class="anchor" name="extradata"></a>extraData?: <span class="propType">any</span> <a class="hash-link" href="#extradata">#</a></h4>
       <div><p>A marker property for telling the list to re-render (since it implements <code>PureComponent</code>). If
any of your <code>renderItem</code>, Header, Footer, etc. functions depend on anything outside of the
<code>data</code> prop, stick it here and treat it immutably.</p>
       </div>
       </div>
    <div class="prop">
       <h4 class="propTitle"><a class="anchor" name="getitem"></a>getItem?: <a class="hash-link" href="#getitem">#</a>
    </h4>
       </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getitemcount"></a>getItemCount?: <a
            class="hash-link" href="#getitemcount">#</a></h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getitemlayout"></a>getItemLayout?: <span
            class="propType"><code>(data: ?Array&lt;ItemT&gt;, index: number) =&gt;
  {length: number, offset: number, index: number}</code></span> <a class="hash-link"
                                                                   href="#getitemlayout">#</a></h4>
        <div><p><code>getItemLayout</code>是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。如果你的行高是固定的，<code>getItemLayout</code>用起来就既高效又简单，类似下面这样：</p>
            <div class="prism language-javascript">getItemLayout<span class="token operator">=</span><span
                    class="token punctuation">{</span><span class="token punctuation">(</span>data<span
                    class="token punctuation">,</span> index<span class="token punctuation">)</span> <span
                    class="token operator">=</span><span class="token operator">&gt;</span> <span
                    class="token punctuation">(</span>
                <span class="token punctuation">{</span>length<span class="token punctuation">:</span> 行高<span
                        class="token punctuation">,</span> offset<span class="token punctuation">:</span> 行高
                <span class="token operator">*</span> index<span class="token punctuation">,</span> index<span
                        class="token punctuation">}</span>
                <span class="token punctuation">)</span><span class="token punctuation">}</span></div>
            <p>注意如果你指定了<code>SeparatorComponent</code>，请把分隔线的尺寸也考虑到offset的计算之中。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="horizontal"></a>horizontal?: <span class="propType"><code>?boolean</code></span>
        <a class="hash-link" href="#horizontal">#</a></h4>
        <div><p>设置为true则变为水平布局模式。</p></div>
    </div>
       <div class="prop">
       <h4 class="propTitle"><a class="anchor" name="initialnumtorender"></a>initialNumToRender: <span class="propType">number</span> <a class="hash-link" href="#initialnumtorender">#</a></h4>
       <div><p>How many items to render in the initial batch. This should be enough to fill the screen but not much more. Note these items will never be unmounted as part of the windowed rendering in order to improve perceived performance of scroll-to-top actions.</p></div>
       </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="keyextractor"></a>keyExtractor: <span
            class="propType"><code>(item: ItemT, index: number) =&gt; string</code></span> <a class="hash-link"
                                                                                              href="#keyextractor">#</a>
    </h4>
        <div><p>此函数用于为给定的item生成一个不重复的key。Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。若不指定此函数，则默认抽取<code>item.key</code>作为key值。若<code>item.key</code>也不存在，则使用数组下标。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="legacyimplementation"></a>legacyImplementation?:
        <span class="propType"><code>?boolean</code></span> <a class="hash-link"
                                                               href="#legacyimplementation">#</a></h4>                                     
        <div><p>设置为true则使用旧的ListView的实现。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="numcolumns"></a>numColumns: <span
            class="propType"><code>number</code></span> <a class="hash-link" href="#numcolumns">#</a>
    </h4>
        <div><p>多列布局只能在非水平模式下使用，即必须是<code>horizontal={false}</code>。此时组件内元素会从左到右从上到下按Z字形排列，类似启用了<code>flexWrap</code>的布局。组件内元素必须是等高的——暂时还无法支持瀑布流布局。</p></div>
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
                &lt;/TouchableOpacity<span class="token operator"></span><span class="token operator">&gt;</span>
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
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="viewabilityconfig"></a>viewabilityConfig?: <span
            class="propType"><code>ViewabilityConfig</code></span> <a class="hash-link"
                                                                      href="#viewabilityconfig">#</a>
    </h4>
        <div><p>See <a href="https://github.com/facebook/react-native/blob/master/Libraries/CustomComponents/Lists/ViewabilityHelper.js"><code>ViewabilityHelper</code></a> for flow type and further documentation.</p></div>
    </div>
</div>

### 方法

<div class="props">
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="scrolltoend"></a>scrollToEnd<span
            class="methodType">(params?: object)</span> <a class="hash-link" href="#scrolltoend">#</a>
    </h4>
        <div><p>滚动到底部。如果不设置<code>getItemLayout</code>属性的话，可能会比较卡。</p></div>
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
  Animated,
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
  Spindicator,
  genItemData,
  getItemLayout,
  pressItem,
  renderSmallSwitchOption,
} = require('./ListExampleShared');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const VIEWABILITY_CONFIG = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

class FlatListExample extends React.PureComponent {
  static title = '<FlatList>';
  static description = 'Performant, scrollable list of data.';

  state = {
    data: genItemData(100),
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
    this._listRef.getNode().scrollToIndex({viewPosition: 0.5, index: Number(text)});
  };

  _scrollPos = new Animated.Value(0);
  _scrollSinkX = Animated.event(
    [{nativeEvent: { contentOffset: { x: this._scrollPos } }}],
    {useNativeDriver: true},
  );
  _scrollSinkY = Animated.event(
    [{nativeEvent: { contentOffset: { y: this._scrollPos } }}],
    {useNativeDriver: true},
  );

  componentDidUpdate() {
    this._listRef.getNode().recordInteraction(); // e.g. flipping logViewable switch
  }

  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i');
    const filter = (item) => (
      filterRegex.test(item.text) || filterRegex.test(item.title)
    );
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
            />
          </View>
          <View style={styles.options}>
            {renderSmallSwitchOption(this, 'virtualized')}
            {renderSmallSwitchOption(this, 'horizontal')}
            {renderSmallSwitchOption(this, 'fixedHeight')}
            {renderSmallSwitchOption(this, 'logViewable')}
            {renderSmallSwitchOption(this, 'debug')}
            <Spindicator value={this._scrollPos} />
          </View>
        </View>
        <SeparatorComponent />
        <AnimatedFlatList
          ItemSeparatorComponent={SeparatorComponent}
          ListHeaderComponent={HeaderComponent}
          ListFooterComponent={FooterComponent}
          data={filteredData}
          debug={this.state.debug}
          disableVirtualization={!this.state.virtualized}
          getItemLayout={this.state.fixedHeight ?
            this._getItemLayout :
            undefined
          }
          horizontal={this.state.horizontal}
          key={(this.state.horizontal ? 'h' : 'v') +
            (this.state.fixedHeight ? 'f' : 'd')
          }
          legacyImplementation={false}
          numColumns={1}
          onEndReached={this._onEndReached}
          onRefresh={this._onRefresh}
          onScroll={this.state.horizontal ? this._scrollSinkX : this._scrollSinkY}
          onViewableItemsChanged={this._onViewableItemsChanged}
          ref={this._captureRef}
          refreshing={false}
          renderItem={this._renderItemComponent}
          viewabilityConfig={VIEWABILITY_CONFIG}
        />
      </UIExplorerPage>
    );
  }
  _captureRef = (ref) => { this._listRef = ref; };
  _getItemLayout = (data: any, index: number) => {
    return getItemLayout(data, index, this.state.horizontal);
  };
  _onEndReached = () => {
    this.setState((state) => ({
      data: state.data.concat(genItemData(100, state.data.length)),
    }));
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
  // This is called when items change viewability by scrolling into or out of
  // the viewable area.
  _onViewableItemsChanged = (info: {
      changed: Array<{
        key: string,
        isViewable: boolean,
        item: any,
        index: ?number,
        section?: any,
      }>
    }
  ) => {
    // Impressions can be logged here
    if (this.state.logViewable) {
      infoLog(
        'onViewableItemsChanged: ',
        info.changed.map((v) => ({...v, item: '...'})),
      );
    }
  };
  _pressItem = (key: number) => {
    this._listRef.getNode().recordInteraction();
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
