Sample sheet: https://docs.google.com/spreadsheets/d/1R-hzfTtXW3-mox1s4Wmloum__X_QQHOrMVE6KgRVrAE/edit?usp=sharing

- 1행: filename (header)
- 1열: key

사용법
1. 엑셀 파일을 `.tsv`로 저장 (`File > Download as > .tsv`)
1. `$ node tsv2json.js filename`

    ```bash
    $ node tsv2json.js sample-sheet-for-tsv2json.tsv
    created: localized-zh.json
    created: localized-ko.json
    created: localized-en.json
    ```
1. 생성된 파일 확인
