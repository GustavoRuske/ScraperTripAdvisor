async function getCssSelectors() {
    return {
        REVIEW_COUNT:{
            excellent: "#taplc_detail_filters_ar_responsive_0 > div > div.collapsible.is-shown-at-tablet > div > div.ui_columns.filters > div.prw_rup.prw_filters_detail_checkbox.ui_column.separated.is-5 > div > div.content > div > div:nth-child(1) > span.row_num.is-shown-at-tablet",
            very_good: "#taplc_detail_filters_ar_responsive_0 > div > div.collapsible.is-shown-at-tablet > div > div.ui_columns.filters > div.prw_rup.prw_filters_detail_checkbox.ui_column.separated.is-5 > div > div.content > div > div:nth-child(2) > span.row_num.is-shown-at-tablet",
            reasonable: "#taplc_detail_filters_ar_responsive_0 > div > div.collapsible.is-shown-at-tablet > div > div.ui_columns.filters > div.prw_rup.prw_filters_detail_checkbox.ui_column.separated.is-5 > div > div.content > div > div:nth-child(3) > span.row_num.is-shown-at-tablet",
            bad: "#taplc_detail_filters_ar_responsive_0 > div > div.collapsible.is-shown-at-tablet > div > div.ui_columns.filters > div.prw_rup.prw_filters_detail_checkbox.ui_column.separated.is-5 > div > div.content > div > div:nth-child(4) > span.row_num.is-shown-at-tablet",
            horrible: "#taplc_detail_filters_ar_responsive_0 > div > div.collapsible.is-shown-at-tablet > div > div.ui_columns.filters > div.prw_rup.prw_filters_detail_checkbox.ui_column.separated.is-5 > div > div.content > div > div:nth-child(5) > span.row_num.is-shown-at-tablet"
        },
        TRAVELERS_TYPE:{
            family: "#taplc_detail_filters_ar_responsive_0 > div > div.collapsible.is-shown-at-tablet > div > div.ui_columns.filters > div:nth-child(2) > div > div.content > div > div:nth-child(1) > label",
            romantic: "#taplc_detail_filters_ar_responsive_0 > div > div.collapsible.is-shown-at-tablet > div > div.ui_columns.filters > div:nth-child(2) > div > div.content > div > div:nth-child(2) > label",
            alone: "#taplc_detail_filters_ar_responsive_0 > div > div.collapsible.is-shown-at-tablet > div > div.ui_columns.filters > div:nth-child(2) > div > div.content > div > div:nth-child(3) > label",
            business: "#taplc_detail_filters_ar_responsive_0 > div > div.collapsible.is-shown-at-tablet > div > div.ui_columns.filters > div:nth-child(2) > div > div.content > div > div:nth-child(4) > label",
            friends: "#taplc_detail_filters_ar_responsive_0 > div > div.collapsible.is-shown-at-tablet > div > div.ui_columns.filters > div:nth-child(2) > div > div.content > div > div:nth-child(5) > label"
        },
        PERIOD: {
            mar_may: "#taplc_detail_filters_ar_responsive_0 > div > div.collapsible.is-shown-at-tablet > div > div.ui_columns.filters > div:nth-child(3) > div > div.content > div > div:nth-child(1) > label",
            jun_ago: "#taplc_detail_filters_ar_responsive_0 > div > div.collapsible.is-shown-at-tablet > div > div.ui_columns.filters > div:nth-child(3) > div > div.content > div > div:nth-child(2) > label",
            set_nov: "#taplc_detail_filters_ar_responsive_0 > div > div.collapsible.is-shown-at-tablet > div > div.ui_columns.filters > div:nth-child(3) > div > div.content > div > div:nth-child(3) > label",
            dez_fev: "#taplc_detail_filters_ar_responsive_0 > div > div.collapsible.is-shown-at-tablet > div > div.ui_columns.filters > div:nth-child(3) > div > div.content > div > div:nth-child(4) > label"
        }
    };
}


module.exports.getCssSelectors = getCssSelectors;