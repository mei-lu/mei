export const Instax = () => {
    const instaxElements = document.querySelectorAll(
        "instax"
    ) as NodeListOf<HTMLElement>

    for (const instaxElement of instaxElements) {
        instaxElement.addEventListener("click", () => {})
    }
}
