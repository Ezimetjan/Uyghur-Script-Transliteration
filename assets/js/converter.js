function alphabetMap(keys, values) {
	return keys.reduce((accumulator, value, index) => (accumulator[value] = values[index], accumulator), {});
}

function transliterate(subject, source, target) {
	if (source == "UAA") {
		return arabicToLatin(subject);
	} else {
		return latinToArabic(subject);
	}
}
// Arabic Alphabet to Latin
function arabicToLatin(text) {
	var alphabetMapped = alphabetMap(UAA, ULA) // alphabet map
	var punctuationMapped = alphabetMap(RP, LP)
	var mappedObject = Object.assign(alphabetMapped, punctuationMapped);
	console.log(mappedObject);

	var output = text.split('').reduce((total, value, index, array) => {
		var result = mappedObject[value];
		console.log(result + " " + value);

		if (result == null || allspecial.includes(value)) {
			return total += value;
		} else if (result.localeCompare("'") == 0) {
			return total;
		}
		return total += result;

	}, "");
	return output;
}

function latinToArabic(text) {
	var alphabetMapped = alphabetMap(ULA, UAA)
	var punctuationMapped = alphabetMap(RP, LP)
	var preOutliers = ['s', 'n', 'z', 'g', 'c']
	var postOutliers = ['g', 'h']

	var mappedObject = Object.assign(alphabetMapped, punctuationMapped);

	var output = text.toLowerCase().split('').reduce((total, value, index, array) => {
			var result = mappedObject[value];
			var previousCharacter = array[index - 1];
			var nextCharacter = array[index + 1];
			console.log(result + " " + value);
			// Check if value is common punctuations, if true add value directly.
			if (pspecial.includes(value)) {
				return total += value;
			}
			//2
			if (cspecial.includes(value)) {
				if (previousCharacter == null || allspecial.includes(previousCharacter)) {
					return total += 'ئ' + result;
				}
			}
			//3
			if (preoutliers.includes(value)) {
				if (postOutliers.includes(nextCharacter)) {
					var doubleCharacter = value + nextCharacter;
					return total += mappedObject[doubleCharacter];
				}
			}
			//4
			if (postOutliers.includes(value)) {
				if (preOutliers.includes(previousCharacter)) {
					return total;
				}
			}
			//5
			if (result == null) {
				return total += value;
			}
			return total += result;
		},
		"");
	console.log(output);
	return output
}


function convert() {
	var subject = document.getElementById("source").value
	document.getElementById("target").value = transliterate(subject, "UAA", "ULA");
}


// Right punctuations
var RP = ['،', '؟', '؛', '٭', '“', '„', '&#8220;', '&#8222;', '”', '‟', '&#8221;', '&#8223;']

// Left punctuations
var LP = [',', '?', ';', '*', '„', '«', '«', '»', '»', '»', '»', '»']

var preoutliers_no_n = ['s', 'z', 'g', 'c']
var preoutliers = ['s', 'n', 'z', 'g', 'c']
var suboutliers = ['ğ', 'g', 'h']
var vspecial = ['o', 'u', 'ö', 'ü'] // ver extreme case
var cspecial = ['a', 'i', 'o', 'u', 'ö', 'ü', 'é', 'e'] // char special
var pspecial = [" ", "(", ",", "{", "}", ",", ".", "!", '"', '-'] // punctuation special
var allspecial = cspecial + pspecial + ['\n', '\r', '\t']

var UAA = ['ا', 'ە', 'ب', 'پ', 'ت', 'ج', 'چ', 'خ', 'د', 'ر', 'ز', 'ژ', 'س', 'ش', 'ف', 'ڭ', 'ل',
	'م', 'ھ', 'و', 'ۇ', 'ۆ', 'ۈ', 'ۋ', 'ې', 'ى', 'ي', 'ق', 'ك', 'گ', 'ن', 'غ', 'ئ', 'يا', 'يۇ'
];

// Commont Turkick alphabet
const CTA = ['a', 'e', 'b', 'p', 't', 'c', 'ç', 'x', 'd', 'r', 'z', 'j', 's', 'ş', 'f', 'ñ', 'l',
	'm', 'h', 'o', 'u', 'ö', 'ü', 'v', 'é', 'i', 'y', 'q', 'k', 'g', 'n', 'ğ', "'", 'ya', 'yu'
];

// Uyghur Latin alphabet
var ULA = ['a', 'e', 'b', 'p', 't', 'j', 'ch', 'x', 'd', 'r', 'z', 'zh', 's', 'sh', 'f', 'ng', 'l',
	'm', 'h', 'o', 'u', 'ö', 'ü', 'w', 'é', 'i', 'y', 'q', 'k', 'g', 'n', 'gh', "'", 'ya', 'yu'
];

// Uyghur Cyrillic alphabet
var UCA = ['а', 'ә', 'б', 'п', 'т', 'җ', 'ч', 'х', 'д', 'р', 'з', 'ж', 'с', 'ш', 'ф', 'ң', 'л',
	'м', 'һ', 'о', 'у', 'ө', 'ү', 'в', 'е', 'и', 'й', 'қ', 'к', 'г', 'н', 'ғ', "'", 'я', 'ю'
];

// Qazaq apstrov alphabet
// var APS = ['a', "a'", 'b', 'p', 't', 'j', "c'", 'x', 'd', 'r', 'z', "j'", 's', "s'", 'f', "n'", 'l',
// 'm', 'h', 'o', 'u', "o'", "u'", 'w', "i'", 'i', 'y', 'q', 'k', 'g', 'n', "g'", "'", 'ya', 'yu'];

// Qazaq apstrov alphabet
var APS = ['a', "a'", 'b', 'p', 't', 'jh', "ch", 'x', 'd', 'r', 'z', "j", 's', "sh", 'f', "ng", 'l',
	'm', 'h', 'o', 'u', "o'", "u'", 'v', "e", 'i', 'y', 'q', 'k', 'g', 'n', "gh", "'", 'ya', 'yu'
];

// // Ozebk alphabet
// var OBK = ['a', "a'", 'b', 'p', 't', 'j', "c'", 'x', 'd', 'r', 'z', "j'", 's', "sh", 'f', "nh", 'l',
// 'm', 'h', 'o', 'u', "o'", "u'", 'w', "i'", 'i', 'y', 'q', 'k', 'g', 'n', "gh", "'", 'ya', 'yu'];

// Custom script
var custom = []

// Ids of inputs
var IDs = ['A', "a", 'B', 'P', 'T', 'J', "c", 'X', 'D', 'R', 'Z', "j", 'S', "s", 'F', "n", 'L',
	'M', 'H', 'O', 'U', "o", "u", 'W', "i", 'I', 'Y', 'Q', 'K', 'G', 'N', "g"
];

var noinfo = 0;
var with_sample_text = 1;

var source_script = "";
var target_script = "";

sample_UAA_text = "ھەممە ئادەم تۇغۇلۇشىدىنلا ئەركىن، ئىززەت۔ھۆرمەت ۋە ھوقۇقتا باب۔باراۋەر بولۇپ تۇغۇلغان. ئۇلار ئەقىلگە ۋە ۋىجدانغا ئىگە ھەمدە بىر۔بىرىگە قېرىنداشلىق مۇناسىۋىتىگە خاس روھ بىلەن مۇئامىلە قىلىشى كېرەك.\n\n";
sample_UAA_text += "قول باش پۇت كۆز جەڭچى جۇدې سان سەي ئې شىر شاڭخەي كىتاب ۋەتەن تومۇر كۆمۈر ئېلىكتىر ۋەتەن ۋيېتنام شىنجاڭ ئانار ئەنجۈر ئوردا ئۇرۇش ئۆردەك ئۈزۈم ئېلان ئىنكاس ئىنىكئانا ئەسئەت رادىئو مەسئۇل قارىئۆرۈك نائۈمىد ئىتئېيىق جەمئىي نەمەنگان ئۆزخان پاسخا بايرىمى جۇڭخۇا";

sample_CTA_text = "hemme adem tuğuluşidinla erkin, izzet-hörmet ve hoquqta babbaraver bolup tuğulğan. ular eqilge ve vicdan'ğa ige hemde bir-birige qérindaşliq munasivitige xas roh bilen mu'amile qilişi kérek."
sample_UCA_text = "Һәммә адәм туғулушидинла әркин, иззәт-һөрмәт вә һоқуқта баббаравәр болуп туғулған. Улар әқилгә вә виҗданға игә һәмдә бир-биригә қериндашлиқ мунасивитигә хас роһ билән муамилә қилиши керәк.";
sample_ULA_text = "Hemme adem tughulushidinla erkin, izzet-hörmet we hoquqta babbarawer bolup tughulghan. Ular eqilge we wijdan'gha ige hemde bir-birige qérindashliq munasiwitige xas roh bilen mu'amile qilishi kérek.";
sample_APS_text = "ha'mma' ada'm tughulushidinla a'rkin, izza't۔ho'rma't va' hoquqta bab۔barava'r bolup tughulghan. ular a'qilga' va' vijhdangha iga' ha'mda' bir۔biriga' qerindashliq munasivitiga' xas roh bila'n muamila' qilishi kera'k." +
	"qol bash put ko'z jha'ngchi jhude san sa'y e shir shangxa'y kitab va'ta'n tomur ko'mu'r eliktir va'ta'n vyetnam shinjhang anar a'njhu'r orda urush o'rda'k u'zu'm elan inkas inik'ana a's'a't radio ma's'ul qario'ru'k nau'mid it'eyiq" +
	"jha'm'iy na'ma'ngan o'zxan pasxa bayrimi jhungxua";

(function () {
	var sampleText = 'تالانتلىق شائىر، ئوت يۈرەك ئىنقىلابچى، مىللەت سۆيەر جەڭچى ئابدۇخالىق ئابدۇرەھمان ئوغلى ئۇيغۇر 1901-يىلى 2-ئاينىڭ 9-كۈنى تۇرپان شەھىرىنىڭ باغرى يېزىسىدا مەرىپەتپەرۋەر سودىگەر ئائىلىسىدە دۇنياغا كەلگەن.';
	document.getElementById("source").value = sampleText;

})();