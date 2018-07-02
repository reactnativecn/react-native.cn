高性能的分组(section)列表组件，支持下面这些常用的功能：

- 完全跨平台。
- 支持水平布局模式。
- 行组件显示或隐藏时可配置回调事件。
- 支持单独的头部组件。
- 支持单独的尾部组件。
- 支持自定义行间分隔线。
- 支持下拉刷新。
- 支持上拉加载。

如果你的列表不需要分组(section)，那么可以使用结构更简单的[`<FlatList>`](flatlist.html)。

简单的例子：

```javascript
<SectionList
  renderItem={({item}) => <ListItem title={item.title} />}
  renderSectionHeader={({section}) => <Header title={section.key} />}
  sections={[ // 不同section渲染相同类型的子组件
    {data: [...], title: ...},
    {data: [...], title: ...},
    {data: [...], title: ...},
  ]}
/>

<SectionList
  sections={[ // 不同section渲染不同类型的子组件
    {data: [...], renderItem: ...},
    {data: [...], renderItem: ...},
    {data: [...], renderItem: ...},
  ]}
/>
```

本组件实质是基于[`<VirtualizedList>`](virtualizedlist.html)组件的封装，因此也有下面这些需要注意的事项：

- 当某行滑出渲染区域之外后，其内部状态将不会保留。请确保你在行组件以外的地方保留了数据。
- 本组件继承自`PureComponent`而非通常的`Component`，这意味着如果其`props`在`浅比较`中是相等的，则不会重新渲染。所以请先检查你的`renderItem`函数所依赖的`props`数据（包括`data`属性以及可能用到的父组件的state），如果是一个引用类型（Object或者数组都是引用类型），则需要先修改其引用地址（比如先复制到一个新的Object或者数组中），然后再修改其值，否则界面很可能不会刷新。（译注：这一段不了解的朋友建议先学习下[js中的基本类型和引用类型](https://segmentfault.com/a/1190000002789651)。）
- 为了优化内存占用同时保持滑动的流畅，列表内容会在屏幕外异步绘制。这意味着如果用户滑动的速度超过渲染的速度，则会先看到空白的内容。这是为了优化不得不作出的妥协，而我们也在设法持续改进。
- 默认情况下每行都需要提供一个不重复的key属性。你也可以提供一个`keyExtractor`函数来生成key。

### 属性

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="itemseparatorcomponent"></a>ItemSeparatorComponent?:
        <span class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                             href="#itemseparatorcomponent">#</a>
    </h4>
        <div>
        	<p>行与行之间的分隔线组件。不会出现在第一行之前和最后一行之后。 <code>highlighted</code>,
<code>section</code>, and <code>[leading/trailing][Item/Separator]</code> 这三个属性是默认提供的. <code>renderItem</code> 提供了
<code>separators.highlight</code>/<code>unhighlight</code> 这两个方法来更新 <code>highlighted</code> 这个属性的状态, 但是你也可以利用<code>separators.updateProps</code>这个方法来添加自定义属性.</p>
        </div>
    </div>
    <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="listemptycomponent"></a>ListEmptyComponent?: <span class="propType"><span>?<span><span>ReactClass&lt;any&gt; | </span>React.Element&lt;any&gt;</span></span></span> <a class="hash-link" href="#listemptycomponent">#</a></h4>
	    <div><p>当列表为空时渲染。可以是一个React组件类，一个渲染函数，或一个已经渲染的元素。</p>
		</div>
	</div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="listfootercomponent"></a>ListFooterComponent?: <span
            class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                           href="#listfootercomponent">#</a>
    </h4>
        <div><p>尾部组件</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="listheadercomponent"></a>ListHeaderComponent?: <span
            class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                           href="#listheadercomponent">#</a>
    </h4>
        <div><p>头部组件</p></div>
    </div>
    <div class="prop">
    	<h4 class="propTitle"><a class="anchor" name="sectionseparatorcomponent"></a>SectionSeparatorComponent?: <span class="propType"><span>?ReactClass&lt;any&gt;</span></span> <a class="hash-link" href="#sectionseparatorcomponent">#</a></h4>
	    <div><p>在每个`section`的顶部和底部渲染(区别于
	<code>ItemSeparatorComponent</code>，它仅在列表项之间渲染)。它的作用是为了从视觉上把`section`与它上方或下方的`headers`区别开来，从这个意义上讲，它的作用和<code>ItemSeparatorComponent</code>是一样的. 它也 接受<code>highlighted</code>, <code>[leading/trailing][Item/Separator]</code>这两个默认提供的属性或其他通过<code>separators.updateProps</code>添加的自定义属性.</p>
		</div>
	</div>
   <div class="prop">
       <h4 class="propTitle"><a class="anchor" name="extradata"></a>extraData?: <span class="propType">any</span> <a class="hash-link" href="#extradata">#</a></h4>
       <div><p>如果有除<code>data</code>以外的数据用在列表中（不论是用在<code>renderItem</code>还是Header或者Footer中），请在此属性中指定。同时此数据在修改时也需要先修改其引用地址（比如先复制到一个新的Object或者数组中），然后再修改其值，否则界面很可能不会刷新。</p>
       </div>
   </div>
    <div class="prop">
       <h4 class="propTitle"><a class="anchor" name="initialnumtorender"></a>initialNumToRender: <span class="propType">number</span> <a class="hash-link" href="#initialnumtorender">#</a></h4>
       <div><p>指定一开始渲染的元素数量，最好刚刚够填满一个屏幕，这样保证了用最短的时间给用户呈现可见的内容。注意这第一批次渲染的元素不会在滑动过程中被卸载，这样是为了保证用户执行返回顶部的操作时，不需要重新渲染首批元素。</p>
       </div>
    </div>	
    <div class="prop">
    	<h4 class="propTitle"><a class="anchor" name="inverted"></a>inverted?: <span class="propType"><span>?boolean</span></span> <a class="hash-link" href="#inverted">#</a></h4>
    	<div><p>翻转滚动方向。实质是将scale变换设置为-1。</p></div>
	</div>
    <div class="prop">
	    <h4 class="propTitle"><a class="anchor" name="keyextractor"></a>keyExtractor: <span
	            class="propType"><code>(item: ItemT, index: number) =&gt; string</code></span> <a class="hash-link" href="#keyextractor">#</a>
	    </h4>
	    <div><p>此函数用于为给定的item生成一个不重复的key。Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。若不指定此函数，则默认抽取<code>item.key</code>作为key值。若<code>item.key</code>也不存在，则使用数组下标。</p></div>
    </div>  
    <div class="prop">
    	<h4 class="propTitle"><a class="anchor" name="onendreached"></a>onEndReached?: <span
            class="propType"><code>?(info: {distanceFromEnd: number}) =&gt; void</code></span> <a class="hash-link"
                                                                                                  href="#onendreached">#</a>
    	</h4>
        <div><p>当列表被滚动到距离内容最底部不足<code>onEndReachedThreshold</code>的距离时调用。</p></div>
    </div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onendreachedthreshold"></a>onEndReachedThreshold?: <span class="propType"><span>?number</span></span> <a class="hash-link" href="#onendreachedthreshold">#</a></h4>
		<div>
			<p>
			决定当距离内容最底部还有多远时触发<code>onEndReached</code>回调。注意此参数是一个比值而非像素单位。比如，0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。
			</p>
		</div>
	</div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onrefresh"></a>onRefresh?: <span
            class="propType"><code>?() =&gt; void</code></span> <a class="hash-link"
                                                                   href="#onrefresh">#</a></h4>
        <div><p>如果设置了此选项，则会在列表头部添加一个标准的<code>RefreshControl</code>控件，以便实现“下拉刷新”的功能。同时你需要正确设置<code>refreshing</code>属性。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onviewableitemschanged"></a>onViewableItemsChanged?:
        <span class="propType"><code>?(info: {viewableItems: Array&lt;ViewToken&gt;, changed: Array&lt;ViewToken&gt;}) =&gt; void</code></span>
        <a class="hash-link" href="#onviewableitemschanged">#</a></h4>
        <div><p>在可见行元素变化时调用。可见范围和变化频率等参数的配置请设置<code>viewabilityconfig</code>属性</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="refreshing"></a>refreshing?: <span class="propType"><code>?boolean</code></span>
        <a class="hash-link" href="#refreshing">#</a></h4>
        <div><p>在等待加载新数据时将此属性设为true，列表就会显示出一个正在加载的符号。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="renderitem"></a>renderItem: <span
            class="propType"><code>(info: {item: Item, index: number}) =&gt; ?React.Element&lt;any&gt;</code></span> <a
            class="hash-link" href="#renderitem">#</a></h4>
        <div><p>用来渲染每一个section中的每一个列表项的默认渲染器。可以在section级别上进行覆盖重写。</p></div>
    </div>
    <div class="prop">
    	<h4 class="propTitle"><a class="anchor" name="rendersectionheader"></a>renderSectionHeader?: <span class="propType"><span>?(info: {section: SectionT}) =&gt; ?React.Element&lt;any&gt;</span></span> <a class="hash-link" href="#rendersectionheader">#</a></h4>
    	<div><p>在每个section的头部渲染。在iOS上，这些headers是默认粘接在<code>ScrollView</code>的顶部的. 参见<a href="#stickysectionheadersenabled"><code>stickySectionHeadersEnabled</code></a>.</p></div>
	</div>
 	<div class="prop">
	 	<h4 class="propTitle"><a class="anchor" name="sections"></a>sections: <span class="propType">$ReadOnlyArray&lt;SectionT&gt;</span> <a class="hash-link" href="#sections">#</a></h4>
	 	<div><p>用来渲染的数据，类似于<a href="flatlist.html" target="_blank"><code>&lt;FlatList&gt;</code></a>中的<code>data</code>属性。</p><p>一般格式:</p><div class="prism language-javascript">sections<span class="token punctuation">:</span> $ReadOnlyArray<span class="token operator">&lt;</span><span class="token punctuation">{</span>
	  data<span class="token punctuation">:</span> $ReadOnlyArray<span class="token operator">&lt;</span>SectionItem<span class="token operator">&gt;</span><span class="token punctuation">,</span>
	  renderItem<span class="token operator">?</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>item<span class="token punctuation">:</span> SectionItem<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token operator">?</span>React<span class="token punctuation">.</span>Element<span class="token operator">&lt;</span><span class="token operator">*</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
	  ItemSeparatorComponent<span class="token operator">?</span><span class="token punctuation">:</span> <span class="token operator">?</span>ReactClass<span class="token operator">&lt;</span><span class="token punctuation">{</span>highlighted<span class="token punctuation">:</span> boolean<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token operator">&gt;</span></div></div>
	</div>
    <div class="prop">
	    <h4 class="propTitle"><a class="anchor" name="stickysectionheadersenabled"></a>stickySectionHeadersEnabled?: <span class="propType">boolean</span> <a class="hash-link" href="#stickysectionheadersenabled">#</a></h4>
	    <div><p>当下一个section把它的前一个section的可视区推离屏幕的时候，让这个section的header粘连在屏幕的顶端。这个属性在iOS上是默认可用的，因为这是iOS的平台规范。</p></div>
	</div>
</div>



### 方法

<div class="props">
	<div class="prop">
		<h4 class="methodTitle"><a class="anchor" name="scrolltolocation"></a>scrollToLocation<span class="methodType">(params: object)</span> <a class="hash-link" href="#scrolltolocation">#</a></h4>
		<div><p>将可视区内位于特定<code>sectionIndex</code> 或 <code>itemIndex</code> (section内)位置的列表项，滚动到可视区的制定位置。比如说，<code>viewPosition</code> 为0时将这个列表项滚动到可视区顶部 (可能会被顶部粘接的header覆盖), 为1时将它滚动到可视区底部, 为0.5时将它滚动到可视区中央。<code>viewOffset</code>是一个以像素为单位，到最终位置偏移距离的固定值，比如为了弥补粘接的header所占据的空间</p>
		<p>注意: 如果没有设置<code>getItemLayout</code>，就不能滚动到位于外部渲染区的位置。</p></div></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="recordinteraction"></a>recordInteraction<span
            class="methodType">()</span> <a class="hash-link" href="#recordinteraction">#</a></h4>
        <div><p>主动通知列表发生了一个事件，以使列表重新计算可视区域。比如说当<code>waitForInteractions</code> 为 true 并且用户没有滚动列表时，就可以调用这个方法。不过一般来说，当用户点击了一个列表项，或发生了一个导航动作时，我们就可以调用这个方法。</p></div>
    </div>
    <div class="prop">
    	<h4 class="methodTitle"><a class="anchor" name="flashscrollindicators"></a>flashScrollIndicators<span class="methodType">()</span> <a class="hash-link" href="#flashscrollindicators">#</a></h4>
    	<div><p>短暂地显示滚动指示器。</p></div>
	</div>
</div>


### 例子

```javascript
'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
  SectionList,
  StyleSheet,
  Text,
  View,
} = ReactNative;

const RNTesterPage = require('./RNTesterPage');

const infoLog = require('infoLog');

const {
  HeaderComponent,
  FooterComponent,
  ItemComponent,
  PlainInput,
  SeparatorComponent,
  genItemData,
  pressItem,
  renderSmallSwitchOption,
  renderStackedItem,
} = require('./ListExampleShared');

const VIEWABILITY_CONFIG = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

const renderSectionHeader = ({section}) => (
  <View>
    <Text style={styles.headerText}>SECTION HEADER: {section.key}</Text>
    <SeparatorComponent />
  </View>
);

const CustomSeparatorComponent = ({text}) => (
  <View>
    <SeparatorComponent />
    <Text style={styles.separatorText}>{text}</Text>
    <SeparatorComponent />
  </View>
);

class SectionListExample extends React.PureComponent {
  static title = '<SectionList>';
  static description = 'Performant, scrollable list of data.';

  state = {
    data: genItemData(1000),
    filterText: '',
    logViewable: false,
    virtualized: true,
  };
  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i');
    const filter = (item) => (filterRegex.test(item.text) || filterRegex.test(item.title));
    const filteredData = this.state.data.filter(filter);
    return (
      <RNTesterPage
        noSpacer={true}
        noScroll={true}>
        <View style={styles.searchRow}>
          <PlainInput
            onChangeText={filterText => {
              this.setState(() => ({filterText}));
            }}
            placeholder="Search..."
            value={this.state.filterText}
          />
          <View style={styles.optionSection}>
            {renderSmallSwitchOption(this, 'virtualized')}
            {renderSmallSwitchOption(this, 'logViewable')}
          </View>
        </View>
        <SeparatorComponent />
        <SectionList
          ListHeaderComponent={HeaderComponent}
          ListFooterComponent={FooterComponent}
          SectionSeparatorComponent={() => <CustomSeparatorComponent text="SECTION SEPARATOR" />}
          ItemSeparatorComponent={() => <CustomSeparatorComponent text="ITEM SEPARATOR" />}
          enableVirtualization={this.state.virtualized}
          onRefresh={() => alert('onRefresh: nothing to refresh :P')}
          onViewableItemsChanged={this._onViewableItemsChanged}
          refreshing={false}
          renderItem={this._renderItemComponent}
          renderSectionHeader={renderSectionHeader}
          sections={[
            {renderItem: renderStackedItem, key: 's1', data: [
              {title: 'Item In Header Section', text: 'Section s1', key: '0'},
            ]},
            {key: 's2', data: [
              {noImage: true, title: 'First item', text: 'Section s2', key: '0'},
              {noImage: true, title: 'Second item', text: 'Section s2', key: '1'},
            ]},
            {key: 'Filtered Items', data: filteredData},
          ]}
          viewabilityConfig={VIEWABILITY_CONFIG}
        />
      </RNTesterPage>
    );
  }
  _renderItemComponent = ({item}) => <ItemComponent item={item} onPress={this._pressItem} />;
  // This is called when items change viewability by scrolling into our out of the viewable area.
  _onViewableItemsChanged = (info: {
    changed: Array<{
      key: string, isViewable: boolean, item: {columns: Array<*>}, index: ?number, section?: any
    }>},
  ) => {
    // Impressions can be logged here
    if (this.state.logViewable) {
      infoLog('onViewableItemsChanged: ', info.changed.map((v: Object) => (
        {...v, item: '...', section: v.section.key}
      )));
    }
  };
  _pressItem = (index: number) => {
    pressItem(this, index);
  };
}

const styles = StyleSheet.create({
  headerText: {
    padding: 4,
  },
  optionSection: {
    flexDirection: 'row',
  },
  searchRow: {
    paddingHorizontal: 10,
  },
  separatorText: {
    color: 'gray',
    alignSelf: 'center',
    padding: 4,
    fontSize: 9,
  },
});

module.exports = SectionListExample;
```
