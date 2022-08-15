import lunr from "lunr"

export function prepareSearchIndex(input) {
    var idx = lunr(function () {
        this.ref('url')
        this.field('content')

        input.forEach(function (doc) {
            this.add({
                'url': doc.url,
                'content': doc.rawContent(),
            })

            doc.getHeadings().map((heading) => {
                console.log({
                    'url': doc.url + "#" + heading.slug,
                    'content': heading.text,
                })
                this.add({
                    'url': doc.url + "#" + heading.slug,
                    'content': heading.text,
                })
            }, this)
        }, this)
    })

    return idx
}
