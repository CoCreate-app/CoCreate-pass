import observer from '@cocreate/observer';
import action from '@cocreate/actions';
import passAttributes from "./passAttributes.js";
import passValues from "./passValues.js";

const CoCreatePass = {
	...passAttributes, ...passValues
};


function init() {
	__initPassSessionIds(); // will be derprciated for CoCreate-localStorage
}

// ToDo: can be depreciated do to component localStorage
function __initPassSessionIds() {
	let orgId = window.localStorage.getItem('organization_id');
	let user_id = window.localStorage.getItem('user_id');
	__initPassItems(orgId, ".sessionOrg_Id", true);
	__initPassItems(user_id, ".sessionUser_Id");
}

// ToDo: can be depreciateddo to component localStorage
function __initPassItems(id, selector, noFetch) {
	
	if (id) {
		let elements = document.querySelectorAll(selector);
		elements.forEach(el => {
			passAttributes._setAttributeValue(el, 'document_id', id);
			passAttributes._setAttributeValue(el, 'fetch-document_id', id);
			passAttributes._setAttributeValue(el, 'filter-value', id);
		});
	}
}

observer.init({
	name: 'CoCreatepass',
	observe: ['addedNodes'],
	target: '[pass_id]',
	callback: function(mutation) {
		CoCreatePass.initElement(mutation.target);
	}
});

action.init({
	name: "passAttributes",
	endEvent: "passAttributesEnd",
	callback: (btn, data) => {
		CoCreatePass._setPassAttributes(btn);
	},
});

action.init({
	name: "passValues",
	endEvent: "passValuesEnd",
	callback: (btn, data) => {
		CoCreatePass.passValueAction(btn);
	},
});

init();

export default CoCreatePass;
