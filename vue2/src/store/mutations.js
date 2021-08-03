export default {
    weiXinToolsReadyBool(state, value){			//检测微信sdk
        state.weiXinToolsReadyBool = value;
    },
    dictDataListByCodeValue(state, value){		// 分享开关类型
        state.dictDataListByCodeValue = value;
    },
    weiXinnumStr(state, value){		// 分享开关类型
        state.weiXinnumStr = value;
    },
    addNumStr(state, value){
        state.weiXinnumStr += value?value:1;
    },
    jianNumStr(state, value){
        state.weiXinnumStr -= value?value:1;
    }
};
