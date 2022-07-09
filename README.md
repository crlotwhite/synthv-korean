# SynthV Korean
한국어 가사를 지원하기 위한 SynthV 스크립트.

SynthV script to support Korean lyrics.

## Usage
발음기호를 변환할 노트를 선택하고 스크립트를 실행하면 됩니다.

Just select the notes you want to convert phonetic to and run the script.

## Download

[다운로드(Download)](https://github.com/crlotwhite/synthv-korean/releases/download/v0.0.0/synthv-korean.js)

script 폴더에 파일을 복사해 주세요.

Copy the file to the script folder.

## Why script?
이미 잘 정리된 사용자 정의 사전이 존재하는 것을 알고 있습니다.
하지만 사용자 정의 사전은 한국어 음운론의 특성을 반영하기 어렵다는 단점이 있습니다.

그래서 저는 설계 단계에서부터 다음의 과정을 고려하고 개발을 시작했습니다.

> 한국어 파서 -> 음운론 해석기 -> 타 언어 발음기호로 변환 -> SynthV 기본 처리

한국어 파서는 이미 완료되었고, 음운론 해석기가 현재 스크립트에서 제외되었습니다.
한국어 특성상 언어의 형태소 분석과 한자어 여부, 합성어 여부, 특유의 예외 법칙 적용이 필요하지만, 구현체에 맞춰 타입 스크립트로 개발하다 보니 해결해야 할 과제가 너무 많았습니다.

따라서 분리해서 개발하고 추후 완성이 된다면 이식을 하려고 합니다.

음운론 해석기는 다음 사이트에서 시험해 볼 수 있습니다.
[링크](https://crlotwhite.github.io/korean_phonology_test/)

I know there are already well-organized custom dictionaries.
But, it is hard for custom dictionaries to reflect the characteristics of Korean phonology.

So, from the design stage, I considered the following process and started development.

> Korean Parser -> Phonetic Interpreter -> Convert to other language phonetic symbols -> SynthV Processing (Builtin)

The Korean parser has already been completed, and the phonetic interpreter has been removed from the current stage.
Due to the characteristics of the Korean language, it is necessary to analyze the morpheme, whether it is a Chinese character or not, whether it is a compound word, and the application of a unique rule of exception. 

Also, there were too many tasks to be solved as I developed with TypeScript according to the implementation. (with out NLP, Database, even Web communication)

Therefore, I plan to develop it separately and then transplant it when it is completed.

You can try the phonetic interpreter at: [link](https://crlotwhite.github.io/korean_phonology_test/) 
> the site is Korean (I'm sorry for not supporting English.)

## Road map
음운론 해석기는 완료가 되는 데로 도입하려고 합니다만, 시간이 매우 오래 걸릴 것으로 예상됩니다.
만약 NLP 사용이 필수라면 도입이 불가능하다고 보면 될 것 같습니다.

가장 가까운 개발 순서는 다음과 같습니다.
1. 영어 발음 기호 지원
2. 트랙 명 기반 자동 모드 전환
3. 중국어 발음 기호

The phonetic interpreter is about to be implemented, but is expected to take a very long time. If the use of NLP is essential, it seems impossible to introduce it.

The closest development sequence is:
1. Support for English phonetic symbols
2. Automatic mode switching based on track name
3. Chinese phonetic symbols


