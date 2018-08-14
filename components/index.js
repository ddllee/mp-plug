import Block from './Block';
import Column from './Column';
import Detail from './Detail';
import DetailItem from './DetailItem';
import Loading from './Loading';
import PageFooter from './PageFooter';
import Pager from './Pager';
import Panel from './Panel';
import PushModal from './PushModal';
import Row from './Row';
import Sider from './Sider';
import FormSubmitButton from './FormSubmitButton';
export default {
	install(Vue) {		
		Vue.component(Block.name, Block);
		Vue.component(Column.name, Column);
		Vue.component(Detail.name, Detail);
		Vue.component(DetailItem.name, DetailItem);
		Vue.component(Loading.name, Loading);
		Vue.component(PageFooter.name, PageFooter);
		Vue.component(Pager.name, Pager);
		Vue.component(Panel.name, Panel);
		Vue.component(PushModal.name, PushModal);
		Vue.component(Row.name, Row);
		Vue.component(Sider.name, Sider);
		Vue.component(FormSubmitButton.name, FormSubmitButton);
	}
};