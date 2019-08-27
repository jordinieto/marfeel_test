class Template {
    constructor() {
      this.template = {};
    }
  
    getTemplate(props) {
        this.template = `
        <div class="counter">
        <div class="graphic">
        </div>
        <div class="counter_table">
        <div class="counter_table_cell">
            <h3 class="counter_table_title" style="color: ${props.tabletColor}">
            Tablet
            </h3>
            <div class="counter_table_data">
            <span class="counter_table_perc">
                ${props.tabletPct}
            </span>
            <span class="counter_table_value">
                ${props.tabletAmount}
            </span>
            </div>
        </div>
        <div class="counter_table_cell right">
            <h3 class="counter_table_title" style="color: ${props.phoneColor}">
            Smartphone
            </h3>
            <div class="counter_table_data">
            <span class="counter_table_perc">
                ${props.phonePct}
            </span>
            <span class="counter_table_value">
                ${props.phoneAmount}
            </span>
            </div>
        </div>
        </div>
    </div>
    `;
    return this.template;
    }
  }
  export default Template;