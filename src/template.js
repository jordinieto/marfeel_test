export default function Template(props) {
    const markup = `
        <div class="counter">
        <div class="graphic">
        </div>
        <div class="counter__table">
        <div class="counter__table__cell">
            <h3 class="counter__table__title" style="color: ${props.tabletColor}">
            Tablet
            </h3>
            <div class="counter__table__data">
            <span class="counter__table__data__percentage">
                ${props.data.tabletPct}
            </span>
            <span class="counter__table__data__value">
                ${props.data.tabletAmount}
            </span>
            </div>
        </div>
        <div class="counter__table__cell right">
            <h3 class="counter__table__title" style="color: ${props.phoneColor}">
            Smartphone
            </h3>
            <div class="counter__table__data">
            <span class="counter__table__data__percentage">
                ${props.data.phonePct}
            </span>
            <span class="counter__table__data__value">
                ${props.phoneAmount}
            </span>
            </div>
        </div>
        </div>
    </div>
    `;
    return markup;
}