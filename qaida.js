/* Itqaan · Qaida path
   Step-by-step reading levels, from single letters to tajweed and teaching others.
   All explanations, cards, questions and drawings were written for Itqaan.
   Quran words and verses come from Quran.com (text and word audio) and EveryAyah (Sheikh Ibrahim Al-Akhdar).
   This file is loaded after the main script in index.html and uses its helpers
   (lang, store, esc, num, addStars, confetti, beep, playWord, mouthSVG, mouthApply, MX, LEVELS, doneL, lTitle, views, route, applyLang). */
(()=>{
"use strict";
const AR=()=>lang==="ar";
const tx=(en,ar)=>AR()?ar:en;
const $=id=>document.getElementById(id);
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const pick=(a,n)=>shuf(a).slice(0,n);

/* Real Quran words (verse key, word number, text) found for each letter + short vowel. Tap = Quran.com word audio. */
const SYL={"ا":{"a":["85:8",5,"أَن"],"i":["87:9",2,"إِن"],"u":["84:7",3,"أُوتِىَ"]},"ب":{"a":["89:17",2,"بَل"],"i":["100:4",2,"بِهِۦ"],"u":["100:9",4,"بُعْثِرَ"]},"ت":{"a":["89:6",2,"تَرَ"],"i":["79:12",2,"تِلْكَ"],"u":["86:9",2,"تُبْلَى"]},"ث":{"a":["81:21",2,"ثَمَّ"],"u":["85:10",6,"ثُمَّ"],"i":["76:21",2,"ثِيَابُ"]},"ج":{"a":["110:1",2,"جَآءَ"],"i":["111:5",2,"جِيدِهَا"],"u":["88:7",6,"جُوعٍۢ"]},"ح":{"a":["113:5",5,"حَسَدَ"],"i":["90:2",2,"حِلٌّۢ"],"u":["89:20",3,"حُبًّۭا"]},"خ":{"a":["91:10",2,"خَابَ"],"i":["78:37",10,"خِطَابًۭا"],"u":["86:5",4,"خُلِقَ"]},"د":{"a":["89:21",5,"دَكًّۭا"],"i":["110:2",5,"دِينِ"],"u":["89:21",3,"دُكَّتِ"]},"ذ":{"a":["90:15",2,"ذَا"],"i":["89:10",2,"ذِى"],"u":["85:15",1,"ذُو"]},"ر":{"a":["106:3",2,"رَبَّ"],"i":["106:2",2,"رِحْلَةَ"],"u":["88:18",4,"رُفِعَتْ"]},"ز":{"a":["79:13",3,"زَجْرَةٌۭ"],"i":["99:1",4,"زِلْزَالَهَا"],"u":["102:2",2,"زُرْتُمُ"]},"س":{"a":["102:3",2,"سَوْفَ"],"i":["105:4",4,"سِجِّيلٍۢ"],"u":["88:13",2,"سُرُرٌۭ"]},"ش":{"a":["98:6",15,"شَرُّ"],"i":["78:12",4,"شِدَادًۭا"],"u":["85:7",6,"شُهُودٌۭ"]},"ص":{"a":["89:22",4,"صَفًّۭا"],"i":["1:7",1,"صِرَٰطَ"],"u":["87:19",1,"صُحُفِ"]},"ض":{"a":["88:6",6,"ضَرِيعٍۢ"],"u":["79:29",4,"ضُحَىٰهَا"],"i":["19:82",6,"ضِدًّا"]},"ط":{"a":["79:17",5,"طَغَىٰ"],"u":["79:16",6,"طُوًى"],"i":["38:71",9,"طِينٍۢ"]},"ظ":{"a":["84:14",2,"ظَنَّ"],"i":["77:30",3,"ظِلٍّۢ"],"u":["4:148",10,"ظُلِمَ"]},"ع":{"a":["107:5",3,"عَن"],"i":["98:8",2,"عِندَ"],"u":["81:4",3,"عُطِّلَتْ"]},"غ":{"a":["95:6",8,"غَيْرُ"],"u":["87:5",2,"غُثَآءً"],"i":["15:47",6,"غِلٍّ"]},"ف":{"a":["90:13",1,"فَكُّ"],"i":["85:19",4,"فِى"],"u":["82:3",3,"فُجِّرَتْ"]},"ق":{"a":["87:14",1,"قَدْ"],"u":["112:1",1,"قُلْ"],"i":["2:11",2,"قِيلَ"]},"ك":{"a":["110:3",6,"كَانَ"],"i":["80:16",1,"كِرَامٍۭ"],"u":["85:9",8,"كُلِّ"]},"ل":{"a":["87:13",2,"لَا"],"i":["81:28",1,"لِمَن"],"u":["104:1",4,"لُّمَزَةٍ"]},"م":{"a":["85:7",3,"مَا"],"i":["85:11",9,"مِن"],"u":["85:9",3,"مُلْكُ"]},"ن":{"a":["98:6",9,"نَارِ"],"u":["88:19",4,"نُصِبَتْ"],"i":["29:58",15,"نِعْمَ"]},"ه":{"a":["79:18",2,"هَل"],"i":["97:5",2,"هِىَ"],"u":["79:14",2,"هُم"]},"و":{"a":["85:8",1,"وَمَا"],"i":["94:2",3,"وِزْرَكَ"],"u":["80:38",1,"وُجُوهٌۭ"]},"ي":{"a":["112:4",2,"يَكُن"],"u":["85:16",3,"يُرِيدُ"]}};
const READ={"1":[["بِسْمِ","ٱللَّهِ","ٱلرَّحْمَـٰنِ","ٱلرَّحِيمِ"],["ٱلْحَمْدُ","لِلَّهِ","رَبِّ","ٱلْعَـٰلَمِينَ"],["ٱلرَّحْمَـٰنِ","ٱلرَّحِيمِ"],["مَـٰلِكِ","يَوْمِ","ٱلدِّينِ"],["إِيَّاكَ","نَعْبُدُ","وَإِيَّاكَ","نَسْتَعِينُ"],["ٱهْدِنَا","ٱلصِّرَٰطَ","ٱلْمُسْتَقِيمَ"],["صِرَٰطَ","ٱلَّذِينَ","أَنْعَمْتَ","عَلَيْهِمْ","غَيْرِ","ٱلْمَغْضُوبِ","عَلَيْهِمْ","وَلَا","ٱلضَّآلِّينَ"]],"112":[["قُلْ","هُوَ","ٱللَّهُ","أَحَدٌ"],["ٱللَّهُ","ٱلصَّمَدُ"],["لَمْ","يَلِدْ","وَلَمْ","يُولَدْ"],["وَلَمْ","يَكُن","لَّهُۥ","كُفُوًا","أَحَدٌۢ"]],"113":[["قُلْ","أَعُوذُ","بِرَبِّ","ٱلْفَلَقِ"],["مِن","شَرِّ","مَا","خَلَقَ"],["وَمِن","شَرِّ","غَاسِقٍ","إِذَا","وَقَبَ"],["وَمِن","شَرِّ","ٱلنَّفَّـٰثَـٰتِ","فِى","ٱلْعُقَدِ"],["وَمِن","شَرِّ","حَاسِدٍ","إِذَا","حَسَدَ"]],"114":[["قُلْ","أَعُوذُ","بِرَبِّ","ٱلنَّاسِ"],["مَلِكِ","ٱلنَّاسِ"],["إِلَـٰهِ","ٱلنَّاسِ"],["مِن","شَرِّ","ٱلْوَسْوَاسِ","ٱلْخَنَّاسِ"],["ٱلَّذِى","يُوَسْوِسُ","فِى","صُدُورِ","ٱلنَّاسِ"],["مِنَ","ٱلْجِنَّةِ","وَٱلنَّاسِ"]]};


/* ---------- The 28 letters + hamzah ---------- */
// [letter, name EN, name AR, sound EN, dots EN, dots AR, mouth-map key, heavy?, example word [key,pos,text]]
const LET=[
 ["ا","alif","ألِف","a (it carries the vowel)","no dots","بلا نقاط","hdeep",0,["112:1",4,"أَحَدٌ"]],
 ["ب","bā","باء","b","1 dot below","نقطة واحدة تحت","lb",0,["1:1",1,"بِسْمِ"]],
 ["ت","tā","تاء","t","2 dots on top","نقطتان فوق","tt",0,["111:1",1,"تَبَّتْ"]],
 ["ث","thā","ثاء","th, as in “think”","3 dots on top","ثلاث نقاط فوق","tz",0,["102:4",1,"ثُمَّ"]],
 ["ج","jīm","جيم","j","1 dot in the middle","نقطة واحدة في الوسط","tm",0,["104:2",2,"جَمَعَ"]],
 ["ح","ḥā","حاء","ḥ, a breathy h from the middle of the throat","no dots","بلا نقاط","hmid",0,["113:5",5,"حَسَدَ"]],
 ["خ","khā","خاء","kh, a scratchy sound from the top of the throat","1 dot on top","نقطة واحدة فوق","htop",1,["87:2",2,"خَلَقَ"]],
 ["د","dāl","دال","d","no dots","بلا نقاط","tt",0,["110:2",5,"دِينِ"]],
 ["ذ","dhāl","ذال","th, as in “this”","1 dot on top","نقطة واحدة فوق","tz",0,["94:4",3,"ذِكْرَكَ"]],
 ["ر","rā","راء","r, one quick tap of the tongue","no dots","بلا نقاط","tl",0,["1:2",3,"رَبِّ"]],
 ["ز","zāy","زاي","z","1 dot on top","نقطة واحدة فوق","ts",0,["99:1",2,"زُلْزِلَتِ"]],
 ["س","sīn","سين","s","no dots","بلا نقاط","ts",0,["102:3",2,"سَوْفَ"]],
 ["ش","shīn","شين","sh","3 dots on top","ثلاث نقاط فوق","tm",0,["113:2",2,"شَرِّ"]],
 ["ص","ṣād","صاد","ṣ, a heavy s","no dots","بلا نقاط","ts",1,["1:7",1,"صِرَٰطَ"]],
 ["ض","ḍād","ضاد","ḍ, a heavy d using the side of the tongue","1 dot on top","نقطة واحدة فوق","td",1,["100:1",2,"ضَبْحًۭا"]],
 ["ط","ṭā","طاء","ṭ, a heavy t","no dots","بلا نقاط","tt",1,["105:3",3,"طَيْرًا"]],
 ["ظ","ẓā","ظاء","ẓ, a heavy th, as in “this”","1 dot on top","نقطة واحدة فوق","tz",1,["94:3",3,"ظَهْرَكَ"]],
 ["ع","ʿayn","عين","ʿ, a squeezed sound from the middle of the throat","no dots","بلا نقاط","hmid",0,["96:4",2,"عَلَّمَ"]],
 ["غ","ghayn","غين","gh, like soft gargling","1 dot on top","نقطة واحدة فوق","htop",1,["1:7",5,"غَيْرِ"]],
 ["ف","fā","فاء","f","1 dot on top","نقطة واحدة فوق","lf",0,["108:2",1,"فَصَلِّ"]],
 ["ق","qāf","قاف","q, a deep k from the back of the tongue","2 dots on top","نقطتان فوق","tq",1,["112:1",1,"قُلْ"]],
 ["ك","kāf","كاف","k","no dots","بلا نقاط","tk",0,["112:4",4,"كُفُوًا"]],
 ["ل","lām","لام","l","no dots","بلا نقاط","tl",0,["112:3",1,"لَمْ"]],
 ["م","mīm","ميم","m","no dots","بلا نقاط","lb",0,["114:2",1,"مَلِكِ"]],
 ["ن","nūn","نون","n","1 dot on top","نقطة واحدة فوق","tl",0,["110:1",3,"نَصْرُ"]],
 ["ه","hā","هاء","h, soft, from deep in the throat","no dots","بلا نقاط","hdeep",0,["112:1",2,"هُوَ"]],
 ["و","wāw","واو","w","no dots","بلا نقاط","lw",0,["112:3",3,"وَلَمْ"]],
 ["ي","yā","ياء","y","2 dots below","نقطتان تحت","tm",0,["112:3",2,"يَلِدْ"]],
 ["ء","hamzah","همزة","a little catch in the throat, like the stop in “uh-oh”","no dots","بلا نقاط","hdeep",0,["110:1",2,"جَآءَ"]]];
const LM=Object.fromEntries(LET.map(l=>[l[0],l]));
const LNAME=L=>AR()?LM[L][2]:LM[L][1];
const LAT={"ا":"","ب":"b","ت":"t","ث":"th","ج":"j","ح":"ḥ","خ":"kh","د":"d","ذ":"dh","ر":"r","ز":"z","س":"s","ش":"sh","ص":"ṣ","ض":"ḍ","ط":"ṭ","ظ":"ẓ","ع":"ʿ","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ي":"y"};
const VW={a:{m:"َ",ar:"مفتوحة"},i:{m:"ِ",ar:"مكسورة"},u:{m:"ُ",ar:"مضمومة"}};
const syl=(L,v)=>(L==="ا"?(v==="i"?"إ":"أ"):L)+VW[v].m;
const EASY=["ب","ت","د","ر","س","ف","ك","ل","م","ن"];

/* ---------- Colour only the marks (same colours as the rest of Itqaan) ---------- */
const MRK=/[ً-ٰٟۖ-ۭ]/, MRKG=/[ً-ٰٟۖ-ۭ]/g;
const COL={fat:"var(--m-fat)",kas:"var(--m-kas)",dam:"var(--m-dam)",suk:"var(--m-suk)",sha:"var(--m-sha)",mad:"var(--m-mad)"};
function clusters(w){const o=[];for(const ch of w){if(MRK.test(ch)&&o.length&&o[o.length-1]!==" ")o[o.length-1]+=ch;else o.push(ch)}return o}
function ctype(c,prev,focus){
  const ks=[];
  if(/ّ/.test(c))ks.push(["sha",COL.sha]);
  if(/ً/.test(c))ks.push(["tan",COL.fat]);if(/ٍ/.test(c))ks.push(["tan",COL.kas]);if(/ٌ/.test(c))ks.push(["tan",COL.dam]);
  if(/[ٰۥۦ]/.test(c))ks.push(["mad",COL.mad]);
  if(/[ْۡ]/.test(c))ks.push(["suk",COL.suk]);
  if(/َ/.test(c))ks.push(["fat",COL.fat]);if(/ِ/.test(c))ks.push(["kas",COL.kas]);if(/ُ/.test(c))ks.push(["dam",COL.dam]);
  const base=c.replace(MRKG,"");
  if(!MRK.test(c)&&((base==="ا"&&/َ/.test(prev))||(base==="و"&&/ُ/.test(prev))||(/[يى]/.test(base)&&/ِ/.test(prev))))return {k:"mad",col:COL.mad,letter:1};
  const hit=focus?ks.find(x=>focus.includes(x[0])):ks[0];
  return hit?{k:hit[0],col:hit[1]}:null;
}
function qmk(w,focus){
  if(focus&&!Array.isArray(focus))focus=[focus];
  const cl=clusters(w);let bot="",top="";
  cl.forEach((c,i)=>{const base=esc(c.replace(MRKG,""));const r=c===" "?null:ctype(c,cl[i-1]||"",focus);
    if(!r){bot+=esc(c);top+=base;return}
    if(r.letter&&focus&&!focus.includes("mad")){bot+=esc(c);top+=base;return}
    bot+=`<span style="color:${r.col};-webkit-text-stroke:.05em ${r.col}">${esc(c)}</span>`;
    top+=r.letter?`<span class="qd-hide">${base}</span>`:base});
  return `<span class="ov qmk" dir="rtl"><span class="ovb">${bot}</span><span class="ovt" aria-hidden="true">${top}</span></span>`;
}

/* ---------- Original drawings ---------- */
function face(kind){
  const m={open:`<ellipse cx="60" cy="80" rx="13" ry="15" fill="#7a2e2e"/><ellipse cx="60" cy="89" rx="8" ry="4" fill="#e57373"/>`,
   wide:`<path d="M38 76 Q60 96 82 76 Q60 84 38 76Z" fill="#7a2e2e"/>`,
   round:`<circle cx="60" cy="81" r="9" fill="#7a2e2e" stroke="#e46c9c" stroke-width="5"/>`,
   closed:`<path d="M44 80 Q60 84 76 80" fill="none" stroke="#7a2e2e" stroke-width="4" stroke-linecap="round"/>`}[kind];
  return `<svg class="qd-face" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="50" fill="#f6dfb5"/><circle cx="43" cy="50" r="5" fill="#3b3b3b"/><circle cx="77" cy="50" r="5" fill="#3b3b3b"/><circle cx="34" cy="68" r="6" fill="#f2b8a2" opacity=".6"/><circle cx="86" cy="68" r="6" fill="#f2b8a2" opacity=".6"/>${m}</svg>`;
}
const FACE={open:["Open your mouth","افتح فمك"],wide:["Your jaw drops a little, lips stretch","ينخفض الفك قليلًا وتمتد الشفتان"],round:["Round your lips","ضُمّ شفتيك"],closed:["Stop on the letter. No vowel.","قف على الحرف بلا حركة"]};
const beats=n=>`<div class="qd-beats" aria-label="${n}">${"<i></i>".repeat(n)}<span>${tx(n===1?"1 count":n+" counts",n===1?"حركة واحدة":"حركتان")}</span></div>`;

/* ---------- Questions ---------- */
const Q=(en,ar,opts,big,arOpts=true)=>({q:[en,ar],opts,big,arOpts});
const qName=L=>{const o=pick(LET.filter(x=>x[0]!==L),3).map(x=>x[0]);return Q("What is this letter called?","ما اسم هذا الحرف؟",[{h:LNAME(L),ok:1},...o.map(x=>({h:LNAME(x)}))],qmk(L),false)};
const qFind=(L,pool)=>{const o=pick((pool||LET.map(x=>x[0])).filter(x=>x!==L),3);return Q(`Tap ${LM[L][1]}`,`اضغط على حرف ${LM[L][2]}`,[{h:L,ok:1},...o.map(x=>({h:x}))])};
const sylName=(L,v)=>AR()?`${LM[L][2]} ${VW[v].ar}`:`“${LAT[L]}${v}”`;
const qSyl=(v,L)=>{L=L||pick(EASY,1)[0];const others=["a","i","u"].filter(x=>x!==v).map(x=>syl(L,x));
  return Q(`Which one says ${LAT[L]}${v}?`,`أيّها ${LM[L][2]} ${VW[v].ar}؟`,[{h:qmk(syl(L,v)),ok:1},...others.map(x=>({h:qmk(x)})),{h:qmk(L+"ْ")}])};
const qSound=(v,L)=>{L=L||pick(EASY,1)[0];return Q("How do you read this?","كيف تقرأ هذا؟",["a","i","u"].map(x=>({h:AR()?`${LM[L][2]} ${VW[x].ar}`:`${LAT[L]}${x}`,ok:x===v})),qmk(syl(L,v)),false)};
const yn=(en,ar,big,yes)=>Q(en,ar,[{h:tx("Yes","نعم"),ok:yes},{h:tx("No","لا"),ok:!yes}],big,false);

/* ---------- Card helpers ---------- */
const R=(lead,en,ar)=>({lead,en,ar});
const I=(en,ar)=>({en,ar});

/* ---------- The levels ---------- */
const letterLesson=(id,ls,en,ar)=>({id,en,ar,cards:ls.map(L=>({t:"letter",L})),quiz:()=>shuf([qName(ls[0]),qName(ls[ls.length-1]),qFind(ls[1],ls),qFind(ls[2],ls)].map((x,i)=>i<2?qName(pick(ls,1)[0]):qFind(pick(ls,1)[0],ls)))});
const half=(v,f,to)=>({t:"grid",v,f,to});
const vowelLesson=(id,v,en,ar,concept,fk,words)=>({id,en,ar,cards:[concept,half(v,0,14),half(v,14,28),{t:"info",title:I("Read these Quran words","اقرأ هذه الكلمات من القرآن"),focus:[fk],rows:[R(null,"The coloured mark is today’s mark.","العلامة الملوّنة هي علامة اليوم.")],w:words}],
  quiz:()=>[qSyl(v),qSound(v),qSyl(v),qSound(v)]});

const LV=[
 {id:1,icon:"🅰️",en:"Level 1 · The letters",ar:"المستوى ١: الحروف",ls:[
   letterLesson("l1",["ا","ب","ت","ث","ج"],"Letters ا to ج","الحروف من ا إلى ج"),
   letterLesson("l2",["ح","خ","د","ذ","ر","ز"],"Letters ح to ز","الحروف من ح إلى ز"),
   letterLesson("l3",["س","ش","ص","ض","ط","ظ"],"Letters س to ظ","الحروف من س إلى ظ"),
   letterLesson("l4",["ع","غ","ف","ق","ك"],"Letters ع to ك","الحروف من ع إلى ك"),
   letterLesson("l5",["ل","م","ن","ه","و","ي","ء"],"Letters ل to ي, and ء","الحروف من ل إلى ي، والهمزة"),
   {id:"dots",en:"Look-alike letters: count the dots",ar:"حروف متشابهة: عُدّ النقاط",cards:[
     {t:"fam",title:I("Same shape, different dots","الشكل نفسه، والنقاط مختلفة"),L:["ب","ت","ث"]},
     {t:"fam",L:["ج","ح","خ"]},{t:"fam",L:["د","ذ","ر","ز"]},{t:"fam",L:["س","ش","ص","ض"]},
     {t:"fam",L:["ط","ظ","ع","غ"]},{t:"fam",L:["ف","ق","ن","ي"]}],
    quiz:()=>[["ب","ت","ث"],["ج","ح","خ"],["ف","ق"],["ص","ض"],["ع","غ"],["د","ذ"]].sort(()=>Math.random()-.5).slice(0,4).map(f=>{const L=pick(f,1)[0];
      return Q(`Which letter has ${LM[L][4]}?`,`أيّ حرف له ${LM[L][5]}؟`,f.map(x=>({h:x,ok:x===L})))})}]},
 {id:2,icon:"🔗",en:"Level 2 · Joined letters",ar:"المستوى ٢: الحروف المتصلة",ls:[
   {id:"shapes",en:"Letters change shape when they join",ar:"الحرف يتغيّر شكله عند الاتصال",cards:[
     {t:"info",title:I("Letters hold hands","الحروف تمسك بأيدي بعضها"),big:"بسم",rows:[R(null,"In a word, letters join together.","في الكلمة تتصل الحروف ببعضها."),R(null,"So a letter can look a bit different.","لذلك قد يتغيّر شكل الحرف قليلًا."),R(null,"The main part of the letter stays the same.","لكن جسم الحرف الأساسي يبقى كما هو.")]},
     ...["ب","ع","ه","ك","م","ي"].map(L=>({t:"shape",L}))],
    quiz:()=>pick([["ـعـ","ع",["ع","غ","ف","ق"]],["هـ","ه",["ه","و","م","ع"]],["ـكـ","ك",["ك","ل","ط","ق"]],["ـمـ","م",["م","ه","ف","و"]],["يـ","ي",["ي","ب","ن","ت"]],["ـبـ","ب",["ب","ن","ي","ت"]],["ـع","ع",["ع","ح","غ","ه"]],["ـه","ه",["ه","ة","و","م"]]],4)
      .map(([s,a,o])=>Q("Which letter is this?","ما هذا الحرف؟",o.map(x=>({h:x,ok:x===a})),`<span dir="rtl">${s}</span>`))},
   {id:"nojoin",en:"Six letters that don’t join forward",ar:"ستة حروف لا تتصل بما بعدها",cards:[
     {t:"info",title:I("Six special letters","ستة حروف خاصة"),big:"ا د ذ ر ز و",rows:[R(null,"These 6 letters join the letter before them.","هذه الحروف الستة تتصل بما قبلها."),R(null,"They never join the letter after them.","ولا تتصل أبدًا بما بعدها."),R(null,"So you often see a small gap after them.","لذلك ترى بعدها فراغًا صغيرًا.")]},
     {t:"info",title:I("Spot the gaps","لاحظ الفراغات"),rows:[R("زُ","ز does not join ر","الزاي لا تتصل بالراء"),R("رْ","ر does not join تُ","الراء لا تتصل بالتاء")],w:[["102:2",2,"زُرْتُمُ"]]},
     {t:"info",title:I("Spot the gap","لاحظ الفراغ"),rows:[R("ذَ","ذ does not join لِ","الذال لا تتصل باللام")],w:[["85:11",12,"ذَٰلِكَ"]]}],
    quiz:()=>shuf(["ا","د","ذ","ر","ز","و"]).slice(0,4).map(a=>Q("Which letter never joins the letter after it?","أيّ حرف لا يتصل بما بعده؟",[{h:a,ok:1},...pick(["ب","ت","ج","س","ع","ف","ك","ل","م","ن","ه","ي"],3).map(x=>({h:x}))]))},
   {id:"muqattaat",en:"Letter names in the Quran",ar:"حروف تُقرأ بأسمائها في القرآن",cards:[
     {t:"info",title:I("Some sūrahs start with letters","بعض السور تبدأ بحروف"),big:"الٓمٓ",rows:[R(null,"We read them by their names.","نقرؤها بأسمائها."),R("ا","alif","ألِف"),R("ل","lām","لام"),R("م","mīm","ميم"),R("ـٓ","wavy line = stretch it long","المدّة = مُدّ الصوت طويلًا")],play:"2:1"},
     {t:"info",big:"طه",rows:[R("ط","ṭā","طا"),R("ه","hā","ها")],play:"20:1"},
     {t:"info",big:"يسٓ",rows:[R("ي","yā","يا"),R("س","sīn","سين")],play:"36:1"},
     {t:"info",big:"حمٓ",rows:[R("ح","ḥā","حا"),R("م","mīm","ميم")],play:"40:1"},
     {t:"info",big:"كٓهيعٓصٓ",rows:[R("ك","kāf","كاف"),R("ه","hā","ها"),R("ي","yā","يا"),R("ع","ʿayn","عين"),R("ص","ṣād","صاد")],play:"19:1"},
     {t:"info",title:I("One-letter openings","سور تبدأ بحرف واحد"),rows:[R("نٓ","nūn","نون"),R("قٓ","qāf","قاف"),R("صٓ","ṣād","صاد")],w:[["68:1",1,"نٓ"],["50:1",1,"قٓ"],["38:1",1,"صٓ"]]}],
    quiz:()=>shuf([
      Q("Which letters are in this?","ما الحروف في هذه الكلمة؟",[{h:"ا ل م",ok:1},{h:"ا ل ر"},{h:"ح م"},{h:"ط ه"}],"الٓمٓ"),
      Q("Which letters are in this?","ما الحروف في هذه الكلمة؟",[{h:"ط ه",ok:1},{h:"ي س"},{h:"ح م"},{h:"ق"}],"طه"),
      Q("How many letters are here?","كم حرفًا هنا؟",[{h:num(2),ok:1},{h:num(1)},{h:num(3)},{h:num(4)}],"يسٓ",false),
      Q("How do we read these letters?","كيف نقرأ هذه الحروف؟",[{h:tx("By their names","بأسمائها"),ok:1},{h:tx("As one word","ككلمة واحدة")},{h:tx("We skip them","لا نقرؤها")}],"حمٓ",false)])}]},
 {id:3,icon:"✏️",en:"Level 3 · Short vowels",ar:"المستوى ٣: الحركات القصيرة",ls:[
   vowelLesson("fatha","a","Fatḥah: a","الفتحة",{t:"info",big:"بَ",focus:["fat"],face:"open",rows:[R("بَ","line on top = a","خط فوق الحرف = فتحة"),R(null,"Say it short: ba","اقرأها قصيرة: بَ")]},"fat",[["87:2",2,"خَلَقَ"],["104:2",2,"جَمَعَ"],["113:5",5,"حَسَدَ"]]),
   vowelLesson("kasra","i","Kasrah: i","الكسرة",{t:"info",big:"بِ",focus:["kas"],face:"wide",rows:[R("بِ","line under = i","خط تحت الحرف = كسرة"),R(null,"Say it short: bi","اقرأها قصيرة: بِ")]},"kas",[["1:1",1,"بِسْمِ"],["110:2",5,"دِينِ"],["85:11",9,"مِن"]]),
   vowelLesson("damma","u","Ḍammah: u","الضمة",{t:"info",big:"بُ",focus:["dam"],face:"round",rows:[R("بُ","small و on top = u","واو صغيرة فوق الحرف = ضمة"),R(null,"Say it short: bu","اقرأها قصيرة: بُ")]},"dam",[["112:1",2,"هُوَ"],["112:1",1,"قُلْ"],["86:5",4,"خُلِقَ"]]),
   {id:"mix",en:"Read a, i, u together",ar:"اقرأ الحركات الثلاث معًا",cards:[
     {t:"info",title:I("Three short sounds","ثلاثة أصوات قصيرة"),rows:[R("بَ","= ba","= بَ"),R("بِ","= bi","= بِ"),R("بُ","= bu","= بُ")]},
     {t:"info",rows:[R("دَ","= da","= دَ"),R("دِ","= di","= دِ"),R("دُ","= du","= دُ")]},
     {t:"info",rows:[R("كَ","= ka","= كَ"),R("كِ","= ki","= كِ"),R("كُ","= ku","= كُ")]},
     {t:"info",title:I("Same letters, different marks","الحروف نفسها، والحركات مختلفة"),rows:[R("خَلَقَ","= kha-la-qa","= خَ لَ قَ"),R("خُلِقَ","= khu-li-qa","= خُ لِ قَ")],w:[["87:2",2,"خَلَقَ"],["86:5",4,"خُلِقَ"]]}],
    quiz:()=>shuf([qSyl("a"),qSyl("i"),qSyl("u"),qSound(pick(["a","i","u"],1)[0])])}]},
 {id:4,icon:"🎵",en:"Level 4 · Tanwīn and long vowels",ar:"المستوى ٤: التنوين والمدود",ls:[
   {id:"tanwin",en:"Tanwīn: an extra n",ar:"التنوين: نون زائدة",cards:[
     {t:"info",title:I("Two marks = add an n","علامتان = أضف نونًا"),rows:[R("بً","2 lines on top = ban","فتحتان = بَنْ"),R("بٍ","2 lines under = bin","كسرتان = بِنْ"),R("بٌ","2 ḍammahs = bun","ضمتان = بُنْ")]},
     {t:"info",title:I("Read these Quran words","اقرأ هذه الكلمات من القرآن"),focus:["tan"],rows:[R("أَحَدٌ","= a-ḥa-dun","= أَحَدُنْ"),R("لَهَبٍ","= la-ha-bin","= لَهَبِنْ")],w:[["112:1",4,"أَحَدٌ"],["111:1",4,"لَهَبٍۢ"]]},
     {t:"info",title:I("A silent alif","ألف لا تُقرأ"),focus:["tan"],rows:[R("ـًا","the ا after ـً is not read","الألف بعد تنوين الفتح لا تُقرأ عند الوصل"),R("كُفُوًا","= ku-fu-wan","= كُفُوَنْ")],w:[["112:4",4,"كُفُوًا"]]}],
    quiz:()=>shuf([
      Q("Which one says bun?","أيّها بُنْ؟",[{h:qmk("بٌ"),ok:1},{h:qmk("بُ")},{h:qmk("بً")},{h:qmk("بٍ")}]),
      Q("Which one says ban?","أيّها بَنْ؟",[{h:qmk("بً"),ok:1},{h:qmk("بَ")},{h:qmk("بٌ")},{h:qmk("بٍ")}]),
      Q("Which one says bin?","أيّها بِنْ؟",[{h:qmk("بٍ"),ok:1},{h:qmk("بِ")},{h:qmk("بٌ")},{h:qmk("بً")}]),
      yn("Do we read the ا at the end of كُفُوًا here?","هل نقرأ الألف في آخر كُفُوًا عند الوصل؟",qmk("كُفُوًا",["tan"]),false)])},
   {id:"long",en:"Long vowels: ا و ي",ar:"حروف المد: ا و ي",cards:[
     {t:"info",title:I("Stretch it for 2 counts","مُدّ الصوت حركتين"),focus:["mad"],beats:2,rows:[R("بَا","ا after fatḥah = baa","ألف بعد فتحة = بَا"),R("بُو","و after ḍammah = buu","واو بعد ضمة = بُو"),R("بِي","ي after kasrah = bii","ياء بعد كسرة = بِي")]},
     {t:"info",title:I("Short or long?","قصير أم طويل؟"),rows:[R("بَ","short: 1 count","قصير: حركة واحدة"),R("بَا","long: 2 counts","طويل: حركتان")],focus:["fat","mad"]},
     {t:"info",title:I("Read these Quran words","اقرأ هذه الكلمات من القرآن"),focus:["mad"],rows:[R(null,"The coloured letter is stretched.","الحرف الملوّن يُمدّ.")],w:[["83:13",5,"قَالَ"],["89:24",1,"يَقُولُ"],["110:2",5,"دِينِ"]]},
     {t:"info",title:I("Small long-vowel signs","علامات مدّ صغيرة"),focus:["mad"],rows:[R("مَـٰ","small standing alif = long aa","ألف صغيرة = مدّ"),R("هُۥ","small و = long uu","واو صغيرة = مدّ"),R("هِۦ","small ي = long ii","ياء صغيرة = مدّ")]},
     {t:"info",title:I("Find the small signs","ابحث عن العلامات الصغيرة"),focus:["mad"],rows:[R(null,"Tap a word to hear it stretched.","اضغط على كلمة لتسمع المدّ.")],w:[["1:4",1,"مَـٰلِكِ"],["80:18",4,"خَلَقَهُۥ"],["100:4",2,"بِهِۦ"]]}],
    quiz:()=>shuf([
      Q("Which one is long?","أيّها ممدود؟",[{h:qmk("بَا",["fat","mad"]),ok:1},{h:qmk("بَ")},{h:qmk("بِ")},{h:qmk("بُ")}]),
      Q("Which one says buu?","أيّها بُو؟",[{h:qmk("بُو",["dam","mad"]),ok:1},{h:qmk("بِي",["kas","mad"])},{h:qmk("بَا",["fat","mad"])},{h:qmk("بُ")}]),
      Q("How long is a long vowel?","كم حركة يُمدّ حرف المد؟",[{h:tx("2 counts","حركتان"),ok:1},{h:tx("1 count","حركة واحدة")},{h:tx("No stretch","لا يُمدّ")}],null,false),
      Q("Which one says bii?","أيّها بِي؟",[{h:qmk("بِي",["kas","mad"]),ok:1},{h:qmk("بِ")},{h:qmk("بُو",["dam","mad"])},{h:qmk("بَا",["fat","mad"])}])])}]},
 {id:5,icon:"⭕",en:"Level 5 · Sukūn and shaddah",ar:"المستوى ٥: السكون والشدة",ls:[
   {id:"sukun",en:"Sukūn: stop on the letter",ar:"السكون: قف على الحرف",cards:[
     {t:"info",big:"أَبْ",focus:["suk"],face:"closed",rows:[R("بْ","small circle = no vowel","دائرة صغيرة = سكون"),R("أَبْ","= ab","= أَبْ")]},
     {t:"info",title:I("Read these Quran words","اقرأ هذه الكلمات من القرآن"),focus:["suk"],rows:[R("قُلْ","= qul","= قُلْ"),R("لَمْ","= lam","= لَمْ")],w:[["112:1",1,"قُلْ"],["112:3",1,"لَمْ"],["87:14",1,"قَدْ"]]},
     {t:"info",title:I("Soft sounds: aw and ay","اللين: أَوْ و أَيْ"),focus:["suk"],rows:[R("خَوْ","وْ after fatḥah = aw","واو ساكنة بعد فتحة = أَوْ"),R("بَيْ","يْ after fatḥah = ay","ياء ساكنة بعد فتحة = أَيْ")],w:[["106:4",7,"خَوْفٍۭ"],["106:1",2,"قُرَيْشٍ"]]}],
    quiz:()=>shuf([
      Q("Which one says ab?","أيّها أَبْ؟",[{h:qmk("أَبْ",["suk"]),ok:1},{h:qmk("أَبَ",["fat"])},{h:qmk("أَبِ",["kas"])},{h:qmk("أَبُ",["dam"])}]),
      Q("Which letter has a sukūn?","أيّ حرف عليه سكون؟",[{h:"ل",ok:1},{h:"ق"}],qmk("قُلْ",["suk"])),
      Q("Which one says bay?","أيّها بَيْ؟",[{h:qmk("بَيْ",["suk"]),ok:1},{h:qmk("بِي",["kas","mad"])},{h:qmk("بَا",["fat","mad"])},{h:qmk("بُو",["dam","mad"])}]),
      Q("What does a sukūn mean?","ماذا يعني السكون؟",[{h:tx("No vowel: stop on the letter","لا حركة: قف على الحرف"),ok:1},{h:tx("Say it twice","انطقه مرتين")},{h:tx("Stretch it long","مُدّه طويلًا")}],qmk("بْ",["suk"]),false)])},
   {id:"shadda",en:"Shaddah: say it twice",ar:"الشدة: حرفان في حرف",cards:[
     {t:"info",big:"أَبَّ",focus:["sha"],rows:[R("بّ","shaddah = the letter twice","الشدة = حرفان"),R(null,"First with a stop, then with the vowel.","الأول ساكن، والثاني متحرك."),R("أَبَّ","= ab-ba","= أَبْ بَ")]},
     {t:"info",title:I("Split it in two","قسّمها إلى قسمين"),focus:["sha","suk"],rows:[R("رَبِّ","= rab + bi","= رَبْ + بِ"),R("ثُمَّ","= thum + ma","= ثُمْ + مَ")]},
     {t:"info",title:I("Read these Quran words","اقرأ هذه الكلمات من القرآن"),focus:["sha"],rows:[R(null,"Press on the coloured letter.","اضغط على الحرف الملوّن بقوة.")],w:[["1:2",3,"رَبِّ"],["111:1",1,"تَبَّتْ"],["102:4",1,"ثُمَّ"]]}],
    quiz:()=>shuf([
      Q("Which one says ab-ba?","أيّها أَبَّ؟",[{h:qmk("أَبَّ",["sha"]),ok:1},{h:qmk("أَبَ",["fat"])},{h:qmk("أَبْ",["suk"])},{h:qmk("أَبَا",["mad"])}]),
      Q("How many ب sounds are in this word?","كم مرة نسمع الباء في هذه الكلمة؟",[{h:num(2),ok:1},{h:num(1)},{h:num(3)}],qmk("رَبِّ",["sha"]),false),
      Q("Which letter has a shaddah?","أيّ حرف عليه شدة؟",[{h:"ب",ok:1},{h:"ت"}],qmk("تَبَّتْ",["sha"])),
      Q("What does a shaddah mean?","ماذا تعني الشدة؟",[{h:tx("Say the letter twice","انطق الحرف مرتين"),ok:1},{h:tx("No vowel","لا حركة")},{h:tx("Stretch it long","مُدّه طويلًا")}],qmk("بّ",["sha"]),false)])},
   {id:"silent",en:"Letters we write but don’t say",ar:"حروف تُكتب ولا تُقرأ",cards:[
     {t:"info",title:I("Alif with a small head","ألف عليها رأس صاد صغير"),big:"ٱ",rows:[R("ٱ","= silent when the words join","= همزة وصل لا تُقرأ عند الوصل"),R("هُوَ ٱللَّهُ","= hu-wal-lāh","= هُوَلْلَاه")],w:[["112:1",2,"هُوَ"],["112:1",3,"ٱللَّهُ"]]},
     {t:"info",title:I("🌙 Moon letters: say the ل","🌙 الحروف القمرية: اللام تُقرأ"),focus:["suk"],rows:[R("ٱلْ","ل has a sukūn = read it","اللام عليها سكون = تُقرأ"),R("ٱلْفَلَقِ","= al-fa-la-qi","= أَلْفَلَقِ")],w:[["113:1",4,"ٱلْفَلَقِ"],["1:2",1,"ٱلْحَمْدُ"]]},
     {t:"info",title:I("☀️ Sun letters: skip the ل","☀️ الحروف الشمسية: اللام لا تُقرأ"),focus:["sha"],rows:[R("ٱلنَّ","no mark on ل, shaddah on the next letter","اللام بلا علامة، وعلى الحرف بعدها شدة"),R("ٱلنَّاسِ","= an-nā-si","= أَنْنَاسِ")],w:[["114:1",4,"ٱلنَّاسِ"],["91:1",1,"وَٱلشَّمْسِ"]]},
     {t:"info",title:I("Which letters are which?","أيّ الحروف من أيّ نوع؟"),rows:[R(null,"☀️ Sun: ت ث د ذ ر ز س ش ص ض ط ظ ل ن","☀️ الشمسية: ت ث د ذ ر ز س ش ص ض ط ظ ل ن"),R(null,"🌙 Moon: ا ب ج ح خ ع غ ف ق ك م و ه ي","🌙 القمرية: ا ب ج ح خ ع غ ف ق ك م و ه ي")]},
     {t:"info",title:I("A small round zero","دائرة صغيرة مستديرة"),rows:[R("وا۟","round zero on a letter = never read it","الصفر المستدير فوق الحرف = لا يُقرأ أبدًا")],w:[["103:3",3,"ءَامَنُوا۟"],["106:3",1,"فَلْيَعْبُدُوا۟"]]}],
    quiz:()=>shuf([
      yn("Do we read the ل here?","هل نقرأ اللام هنا؟",qmk("ٱلنَّاسِ",["sha"]),false),
      yn("Do we read the ل here?","هل نقرأ اللام هنا؟",qmk("ٱلْفَلَقِ",["suk"]),true),
      Q("Which one is a sun letter?","أيّها حرف شمسي؟",[{h:"ش",ok:1},{h:"ق"},{h:"ب"},{h:"م"}]),
      yn("Do we read the last ا here?","هل نقرأ الألف الأخيرة هنا؟",qmk("ءَامَنُوا۟"),false)])}]},
 {id:6,icon:"📖",en:"Level 6 · Read real sūrahs",ar:"المستوى ٦: اقرأ سورًا كاملة",ls:[
   {id:"r1",s:1,en:"Al-Fātiḥah",ar:"سورة الفاتحة"},{id:"r112",s:112,en:"Al-Ikhlāṣ",ar:"سورة الإخلاص"},
   {id:"r113",s:113,en:"Al-Falaq",ar:"سورة الفلق"},{id:"r114",s:114,en:"An-Nās",ar:"سورة الناس"}].map(x=>({...x,read:1,cards:READ[x.s].map((w,i)=>({t:"read",s:x.s,a:i+1,w}))}))},
 {id:7,icon:"🌿",en:"Level 7 · Tajweed",ar:"المستوى ٧: التجويد",tajweed:1,ls:[]},
 {id:8,icon:"🏆",en:"Level 8 · Mastery: test and teach",ar:"المستوى ٨: الإتقان: اختبر وعلّم",ls:[
   {id:"final",en:"Final Qaida check",ar:"الاختبار النهائي للقاعدة",cards:[
     {t:"info",title:I("Ready for the final check?","هل أنت مستعد للاختبار النهائي؟"),big:"🏁",rows:[R(null,"10 questions from every level.","١٠ أسئلة من كل المستويات."),R(null,"No timer. Take your time.","لا يوجد وقت محدد. خذ وقتك."),R(null,"Mistakes are fine. They show what to review.","الأخطاء لا بأس بها، فهي تدلّك على ما تراجعه.")]}],
    quiz:()=>pick(LV.flatMap(l=>l.ls).filter(x=>x.quiz&&x.id!=="final").flatMap(x=>x.quiz()),10)},
   {id:"teach",en:"How to teach the Qaida",ar:"كيف تعلّم القاعدة لغيرك",cards:[
     {t:"info",title:I("🕐 Little and often","🕐 قليل دائم"),rows:[R(null,"5 to 10 minutes a day.","من ٥ إلى ١٠ دقائق كل يوم."),R(null,"A little every day beats a lot once a week.","القليل كل يوم أفضل من الكثير مرة في الأسبوع.")]},
     {t:"info",title:I("👂 Listen, repeat, read","👂 استمع، ردّد، اقرأ"),rows:[R(null,"1. You read. They listen.","١. أنت تقرأ، وهو يستمع."),R(null,"2. You read. They repeat.","٢. أنت تقرأ، وهو يردّد."),R(null,"3. They read alone.","٣. هو يقرأ وحده.")]},
     {t:"info",title:I("👉 Point as you read","👉 أشِر وأنت تقرأ"),rows:[R(null,"Point at each letter with a finger.","أشِر إلى كل حرف بإصبعك."),R(null,"Eyes and voice move together.","تتحرك العين والصوت معًا.")]},
     {t:"info",title:I("💛 Kind corrections","💛 تصحيح بلطف"),rows:[R(null,"Praise the effort first.","امدح الجهد أولًا."),R(null,"Fix one mistake at a time.","صحّح خطأً واحدًا في كل مرة."),R(null,"Let them try again.","دعه يحاول مرة أخرى.")]},
     {t:"info",title:I("🔁 Review first","🔁 راجِع أولًا"),rows:[R(null,"Start each day with yesterday’s page.","ابدأ كل يوم بصفحة الأمس."),R(null,"Move on only when it feels easy.","انتقل للتالي حين يصبح سهلًا.")]},
     {t:"info",title:I("🎧 Copy real recitation","🎧 قلّد تلاوة صحيحة"),rows:[R(null,"Copy a qualified reciter, like the audio here.","قلّد قارئًا متقنًا، مثل التلاوة هنا."),R(null,"Keep reading to a qualified teacher yourself.","واستمر أنت في القراءة على معلّم متقن.")]},
     {t:"info",title:I("🌱 Your path","🌱 طريقك"),rows:[R(null,"Finish every Qaida level.","أتمّ كل مستويات القاعدة."),R(null,"Then finish the tajweed lessons.","ثم أتمّ دروس التجويد."),R(null,"Then teach someone else. Teaching helps you master it.","ثم علّم غيرك، فالتعليم يثبّت الإتقان.")]}]}]}];
const ALL=LV.flatMap(l=>l.ls.map(x=>({...x,lv:l.id})));
const LSN=Object.fromEntries(ALL.map(x=>[x.id,x]));
const ORDER=ALL.map(x=>x.id);

/* ---------- Progress ---------- */
let done=store.get("qaida",[]);
const saveQ=()=>store.set("qaida",done);
const lname=x=>AR()?x.ar:x.en;

/* ---------- Strings ---------- */
const S={
 title:["Qaida: learn to read, step by step","القاعدة: تعلّم القراءة خطوة بخطوة"],
 lead:["Start with the letters. Go one small step at a time, all the way to tajweed. Then teach someone else.","ابدأ بالحروف، وتقدّم خطوة صغيرة كل مرة حتى تصل إلى التجويد، ثم علّم غيرك."],
 who:["For kids, new Muslims and anyone starting out.","للأطفال، وللمسلمين الجدد، ولكل من يبدأ."],
 resume:["Pick up where you left off","تابِع من حيث توقفت"],
 lessons:["lessons done","دروس مكتملة"],
 up:["Up next","التالي"], back:["Back","رجوع"], cont:["Continue","متابعة"], ready:["I’m ready for a few questions","أنا جاهز لبعض الأسئلة"],
 finish:["Finish","إنهاء"], check:["Quick check","تحقّق سريع"], next:["Next","التالي"],
 right:["Correct! +10 ⭐","أحسنت! +١٠ ⭐"], almost:["Almost! 💛","قريب! 💛"], ans:["The answer is","الإجابة الصحيحة"],
 donet:["Lesson complete","أتممت الدرس"], donel:["Well done. Your progress is saved on this phone.","أحسنت! تقدّمك محفوظ على هذا الجهاز."],
 again:["Go over again","أعِد الدرس"], nextl:["Next lesson","الدرس التالي"], all:["All Qaida levels","كل مستويات القاعدة"],
 brk:["Nice work! 🌿","عمل رائع! 🌿"], brkl:["That was about 2 minutes. You can stop here, your place is saved.","هذه دقيقتان تقريبًا. يمكنك التوقف هنا، وسيُحفظ مكانك."],
 stop:["Stop for now","توقّف الآن"], go:["Keep going","تابِع"],
 swipe:["Swipe to turn the page, like a book","اسحب لتقليب الصفحة كالكتاب"],
 name:["Name","الاسم"], sound:["Sound","الصوت"], dots:["Dots","النقاط"],
 heavy:["Heavy letter: say it with a full mouth","حرف مفخَّم: يُنطق بفم ممتلئ"],
 inword:["Hear it in a Quran word","اسمعه في كلمة من القرآن"],
 tapw:["👆 Tap a word to hear it (word audio from Quran.com).","👆 اضغط على كلمة لتسمعها (صوت الكلمات من Quran.com)."],
 grid:["👆 Tap a letter to hear it at the start of a Quran word.","👆 اضغط على حرف لتسمعه في أول كلمة من القرآن."],
 hear:["You heard it in:","سمعته في كلمة:"],
 listen:["Listen to the verse","استمع إلى الآية"],
 ayah:["Āyah","الآية"],
 readtip:["👆 Tap each word to hear it. Then listen to the whole āyah and read along.","👆 اضغط على كل كلمة لتسمعها، ثم استمع إلى الآية كاملة واقرأ معها."],
 shapes:[["Start","أول الكلمة"],["Middle","وسط الكلمة"],["End","آخر الكلمة"],["Alone","وحده"]],
 taj:["Now learn the tajweed rules in the Learn tab. Your progress there shows here too.","تعلّم الآن أحكام التجويد في قسم «تعلّم». تقدّمك هناك يظهر هنا أيضًا."],
 tajgo:["Go to the tajweed lessons","اذهب إلى دروس التجويد"],
 teacher:["Always read to a qualified teacher too. This site helps you practise.","اقرأ دائمًا على معلّم متقن أيضًا، وهذا الموقع يساعدك على التدرّب."],
 lvl:["Level","المستوى"]
};
const s=k=>S[k][AR()?1:0];

/* ---------- Rendering ---------- */
let RS=null, flip=1;
function rows(list,focus){return `<div class="qd-rows">${list.map(r=>`<div class="qd-row">${r.lead?`<span class="qd-lead">${qmk(r.lead,focus)}</span>`:""}<span class="qd-tx">${esc(AR()?r.ar:r.en)}</span></div>`).join("")}</div>`}
function wordsHTML(w,focus){return `<div class="qd-words">${w.map(([k,p,txt])=>`<button class="vw qd-w" data-vw="${k}|${p}">${qmk(txt,focus)}</button>`).join("")}</div><p class="note center">${s("tapw")}</p>`}
function card(c){
  if(c.t==="letter"){const L=LM[c.L];
    return `<article class="card pad center qd-card"><div class="qd-big">${esc(c.L)}</div>
     <div class="qd-rows">
      <div class="qd-row"><span class="qd-k">🏷️ ${s("name")}</span><b>${esc(AR()?L[2]:L[1])}</b></div>
      ${AR()?"":`<div class="qd-row"><span class="qd-k">🗣️ ${s("sound")}</span><span>${esc(L[3])}</span></div>`}
      <div class="qd-row"><span class="qd-k">⚫ ${s("dots")}</span><span>${esc(AR()?L[5]:L[4])}</span></div>
      ${L[7]?`<div class="qd-row"><span class="qd-k">💪</span><span>${s("heavy")}</span></div>`:""}
     </div>
     <div class="qd-mouth">${mouthSVG()}<div class="qd-mxt">👄 ${esc(MX[L[6]][lang])}</div></div>
     <div class="qd-sub">🔊 ${s("inword")}</div>${wordsHTML([L[8]],[])}</article>`}
  if(c.t==="fam")return `<article class="card pad center qd-card">${c.title?`<h2>${esc(AR()?c.title.ar:c.title.en)}</h2>`:""}<div class="qd-big qd-fam" dir="rtl">${c.L.join(" ")}</div>
     ${rows(c.L.map(x=>R(x,`= ${LM[x][1]}: ${LM[x][4]}`,`= ${LM[x][2]}: ${LM[x][5]}`)))}</article>`;
  if(c.t==="shape"){const f=[c.L+"ـ","ـ"+c.L+"ـ","ـ"+c.L,c.L];
    return `<article class="card pad center qd-card"><h2>${esc(LNAME(c.L))}</h2><div class="qd-big">${c.L}</div>
     <div class="qd-shapes">${f.map((x,i)=>`<div><b dir="rtl">${x}</b><small>${S.shapes[i][AR()?1:0]}</small></div>`).join("")}</div></article>`}
  if(c.t==="grid"){const ls=LET.slice(c.f,c.to).map(x=>x[0]).filter(x=>x!=="ء");
    return `<article class="card pad center qd-card"><h2>${esc(lname(LSN[RS.id]))}</h2><p class="note">${s("grid")}</p>
     <div class="qd-now" id="qdnow">&nbsp;</div>
     <div class="qd-grid">${ls.map(L=>{const w=SYL[L]&&SYL[L][c.v];const t=qmk(syl(L,c.v),[{a:"fat",i:"kas",u:"dam"}[c.v]]);
       return w?`<button class="qd-syl snd" data-qsyl="${L}|${c.v}">${t}</button>`:`<div class="qd-syl">${t}</div>`}).join("")}</div></article>`}
  if(c.t==="read"){const key=c.s+":"+c.a;
    return `<article class="card pad center qd-card"><div class="note">${s("ayah")} ${num(c.a)}</div>
     <div class="qd-words qd-read">${c.w.map((w,i)=>`<button class="vw qd-w" data-vw="${key}|${i+1}">${esc(w)}</button>`).join("")}<span class="qd-end">﴿${num(c.a)}﴾</span></div>
     <p class="note">${s("readtip")}</p><div class="row" style="justify-content:center"><button class="btn play" data-play="${key}">🔊 ${s("listen")}</button></div></article>`}
  /* info */
  return `<article class="card pad center qd-card">${c.title?`<h2>${esc(AR()?c.title.ar:c.title.en)}</h2>`:""}
    ${c.big?`<div class="qd-big">${/[؀-ۿ]/.test(c.big)?qmk(c.big,c.focus):c.big}</div>`:""}
    ${c.face?`${face(c.face)}<div class="qd-sub">👄 ${esc(FACE[c.face][AR()?1:0])}</div>`:""}
    ${c.beats?beats(c.beats):""}
    ${c.rows?rows(c.rows,c.focus):""}
    ${c.w?wordsHTML(c.w,c.focus):""}
    ${c.play?`<div class="row" style="justify-content:center"><button class="btn play" data-play="${c.play}">🔊 ${s("listen")}</button></div>`:""}</article>`;
}

function overview(){
  RS=null;
  const nextId=ORDER.find(id=>!done.includes(id));
  const rs=store.get("qd_res",null);
  const total=ORDER.length,dn=ORDER.filter(x=>done.includes(x)).length;
  app.innerHTML=`<h1>${s("title")}</h1><p class="lead">${s("lead")}</p><p class="note" style="margin-top:-18px">${s("who")}</p>
   <div class="card pad qd-sum"><div class="qd-sumrow"><b>${num(dn)}/${num(total)}</b><span>${s("lessons")}</span></div><div class="lvbar"><i style="width:${dn/total*100}%"></i></div></div>
   ${rs&&LSN[rs.id]?`<button class="btn" id="qdres" style="margin:0 0 18px">▶ ${s("resume")}: ${esc(lname(LSN[rs.id]))}</button>`:""}
   ${LV.map(L=>{
     if(L.tajweed){const tl=typeof LEVELS!=="undefined"?LEVELS:[];const tls=tl.flatMap(x=>x.ls);const td=tls.filter(x=>doneL.includes(x)).length;
       return `<details class="level"><summary><span class="lvicon">${L.icon}</span><span style="flex:1"><b>${esc(L[lang])}</b><div class="lvbar"><i style="width:${tls.length?td/tls.length*100:0}%"></i></div></span><span class="note">${num(td)}/${num(tls.length)}</span></summary>
       <div class="card pad" style="margin-top:10px"><p style="margin:0 0 12px">${s("taj")}</p>${rows(tl.map(x=>({lead:null,en:`${x.icon} ${x.en}: ${x.ls.filter(i=>doneL.includes(i)).length}/${x.ls.length}`,ar:`${x.icon} ${x.ar}: ${num(x.ls.filter(i=>doneL.includes(i)).length)}/${num(x.ls.length)}`})))}
       <div class="row" style="justify-content:flex-start"><a class="btn" href="#lessons" style="text-decoration:none">${s("tajgo")}</a></div></div></details>`}
     const d=L.ls.filter(x=>done.includes(x.id)).length,open=L.ls.some(x=>x.id===nextId);
     return `<details class="level" ${open?"open":""}><summary><span class="lvicon">${L.icon}</span><span style="flex:1"><b>${esc(L[lang])}</b><div class="lvbar"><i style="width:${d/L.ls.length*100}%"></i></div></span><span class="note">${num(d)}/${num(L.ls.length)}</span></summary>
      <div class="grid" style="gap:10px;margin-top:10px">${L.ls.map(x=>{const ok=done.includes(x.id),nx=x.id===nextId;
       return `<div class="card lrow" style="--c:var(--brand);${nx?"border-color:var(--brand);box-shadow:0 0 0 2px color-mix(in srgb,var(--brand) 25%,transparent)":""}">
        <div class="lnum">${ok?"✓":num(ORDER.indexOf(x.id)+1)}</div>
        <div style="flex:1;min-width:0">${nx?`<div class="note"><b style="color:var(--brand)">${s("up")}</b></div>`:""}<h3 style="margin:2px 0 0">${esc(lname(x))}</h3></div>
        <button class="btn ${nx?"":"ghost"}" data-qls="${x.id}" aria-label="${esc(lname(x))}">${ok?"↺":"▶"}</button></div>`}).join("")}</div></details>`}).join("")}
   <p class="note" style="margin-top:22px">🎓 ${s("teacher")}</p>`;
  app.querySelectorAll("[data-qls]").forEach(b=>b.onclick=()=>start(b.dataset.qls));
  const r=$("qdres");if(r)r.onclick=()=>{start(rs.id);RS.step=Math.min(rs.step,RS.cards.length-1);run()};
}
function start(id){
  const x=LSN[id];const cards=[];x.cards.forEach((c,i)=>{cards.push(c);if((i+1)%4===0&&i<x.cards.length-1)cards.push({t:"break"})});
  const quiz=(x.quiz?x.quiz():[]).map(q=>({...q,order:shuf(q.opts.map((_,i)=>i)),picked:null}));
  RS={id,cards,step:0,quiz,qi:-1,score:0};run();scrollTo(0,0);
}
function run(){
  setTimeout(()=>{const c=app.querySelector(".qd-card,.qbox,.card.empty");if(c){c.classList.remove("flipN","flipP");void c.offsetWidth;c.classList.add(flip>0?"flipN":"flipP")}flip=1},0);
  const x=LSN[RS.id];store.set("qd_res",RS.qi===-2?null:{id:RS.id,step:RS.step});
  const total=RS.cards.length+RS.quiz.length,pos=RS.qi===-2?total:RS.qi<0?RS.step:RS.cards.length+RS.qi;
  const top=`<div class="note"><a href="#qaida" id="qdback" style="text-decoration:none">${AR()?"→":"←"} ${s("all")}</a> · ${s("lvl")} ${num(x.lv)}</div>
    <h1 style="margin-top:6px">${esc(lname(x))}</h1><div class="progress"><i style="width:${Math.min(100,pos/total*100)}%"></i></div>`;
  let body="",nav="";
  if(RS.qi===-2){
    const i=ORDER.indexOf(RS.id)+1;let nx=ORDER[i];if(nx&&!LSN[nx])nx=null;
    body=`<div class="card empty"><div class="big">🌟</div><h2>${s("donet")}</h2><p style="font-size:18px">${s("donel")}</p><p style="font-size:20px"><b>⭐ +${num(RS.score*10+30)}</b></p></div>`;
    nav=`<div class="row"><button class="btn ghost" id="qdagain">${s("again")}</button>${nx?`<button class="btn" id="qdnextl">${s("nextl")}</button>`:`<a class="btn" href="#qaida" id="qdall" style="text-decoration:none">${s("all")}</a>`}</div>`;
  } else if(RS.qi<0){
    const c=RS.cards[RS.step],last=RS.step===RS.cards.length-1;
    if(c.t==="break"){body=`<div class="card empty"><div class="big">🌿</div><h2>${s("brk")}</h2><p style="font-size:18px;max-width:420px;margin:8px auto">${s("brkl")}</p></div>`;
      nav=`<div class="row" style="justify-content:center"><a class="btn ghost" href="#qaida" id="qdstop" style="text-decoration:none">${s("stop")}</a><button class="btn" id="qnx">${s("go")}</button></div>`;}
    else{body=card(c);
      nav=`<div class="row">${RS.step>0?`<button class="btn ghost" id="qprev">${s("back")}</button>`:""}<button class="btn" id="qnx">${last?(RS.quiz.length?s("ready"):s("finish")):s("cont")}</button></div>
       <div class="swipehint"><button class="arw" data-qarw="prev" aria-label="${s("back")}" ${RS.step>0?"":"disabled"}>${AR()?"→":"←"}</button><span>${s("swipe")}</span><button class="arw" data-qarw="next" aria-label="${s("cont")}">${AR()?"←":"→"}</button></div>`;}
  } else {
    const it=RS.quiz[RS.qi],dn=it.picked!=null,okI=it.opts.findIndex(o=>o.ok);
    body=`<div class="card qbox"><div class="qtop"><span>${s("check")} · ${num(RS.qi+1)}/${num(RS.quiz.length)}</span></div>
      <div class="qtext" style="font-size:20px">${esc(it.q[AR()?1:0])}</div>${it.big?`<div class="qd-big qd-qbig">${it.big}</div>`:""}
      <div class="opts qd-opts">${it.order.map(i=>{const o=it.opts[i];let cls="";if(dn){if(o.ok)cls="right";else if(i===it.picked)cls="wrong"}
        return `<button class="opt ${it.arOpts?"qd-ao":""} ${cls}" data-qo="${i}" ${dn?"disabled":""}><span>${it.arOpts&&!/</.test(o.h)?`<span dir="rtl">${esc(o.h)}</span>`:o.h}</span></button>`}).join("")}</div>
      ${dn?`<div class="fb ${it.opts[it.picked].ok?"ok":"no"}"><b>${it.opts[it.picked].ok?s("right"):s("almost")+" "+s("ans")+":"}</b>${it.opts[it.picked].ok?"":`<span class="${it.arOpts?"qd-ans":""}">${it.arOpts&&!/</.test(it.opts[okI].h)?esc(it.opts[okI].h):it.opts[okI].h}</span>`}</div>`:""}</div>`;
    nav=dn?`<div class="row"><button class="btn" id="qnx">${s("next")}</button></div>`:"";
  }
  app.innerHTML=top+body+nav;
  const c=RS.qi<0&&RS.cards[RS.step];if(c&&c.t==="letter")setTimeout(()=>mouthApply(LM[c.L][6]),250);
  app.querySelectorAll("[data-qarw]").forEach(b=>b.onclick=()=>{const t=$(b.dataset.qarw==="next"?"qnx":"qprev");if(t){if(b.dataset.qarw==="prev")flip=-1;t.click()}});
  const toAll=e=>{e.preventDefault();RS=null;overview();scrollTo(0,0)};
  if($("qdback"))$("qdback").onclick=toAll;
  if($("qdall"))$("qdall").onclick=toAll;
  if($("qdstop"))$("qdstop").onclick=e=>{store.set("qd_res",{id:RS.id,step:RS.step+1});toAll(e)};
  if($("qprev"))$("qprev").onclick=()=>{flip=-1;RS.step--;run();scrollTo(0,0)};
  if($("qdagain"))$("qdagain").onclick=()=>start(RS.id);
  if($("qdnextl"))$("qdnextl").onclick=()=>start(ORDER[ORDER.indexOf(RS.id)+1]);
  if($("qnx"))$("qnx").onclick=()=>{
    if(RS.qi<0){if(RS.step<RS.cards.length-1)RS.step++;else if(RS.quiz.length)RS.qi=0;else finish()}
    else{if(RS.qi<RS.quiz.length-1)RS.qi++;else finish()}
    run();scrollTo(0,0)};
  app.querySelectorAll("[data-qo]").forEach(b=>b.onclick=()=>{const it=RS.quiz[RS.qi];if(it.picked!=null)return;it.picked=+b.dataset.qo;
    if(it.opts[it.picked].ok){RS.score++;addStars(10);try{beep("ok")}catch(e){}}run()});
  app.querySelectorAll("[data-qsyl]").forEach(b=>b.onclick=()=>{const [L,v]=b.dataset.qsyl.split("|");const w=SYL[L][v];
    app.querySelectorAll(".qd-syl.on").forEach(x=>x.classList.remove("on"));b.classList.add("on");
    const n=$("qdnow");if(n)n.innerHTML=`🔊 ${s("hear")} <span class="qd-nw">${qmk(w[2],[{a:"fat",i:"kas",u:"dam"}[v]])}</span>`;
    playWord(w[0],w[1],null)});
}
function finish(){RS.qi=-2;if(!done.includes(RS.id)){done.push(RS.id);saveQ()}addStars(30);setTimeout(confetti,50)}

/* Swipe like a book */
(()=>{let x0=null,y0=null,t0=0;
 app.addEventListener("touchstart",e=>{if(location.hash!=="#qaida"||!RS||RS.qi!==-1)return;const t=e.touches[0];x0=t.clientX;y0=t.clientY;t0=Date.now()},{passive:true});
 app.addEventListener("touchend",e=>{if(x0==null)return;const t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;x0=null;
  if(Math.abs(dx)<60||Math.abs(dx)<Math.abs(dy)*1.5||Date.now()-t0>800)return;
  const next=document.documentElement.dir==="rtl"?dx>0:dx<0;const b=$(next?"qnx":"qprev");if(b&&!b.disabled){flip=next?1:-1;b.click()}},{passive:true});
})();

function qaida(){if(RS)return run();overview()}

/* ---------- Plug into the site ---------- */
const css=`
.qd-card h2{margin:0 0 6px}
.qd-big{font-family:"Amiri Quran",serif;font-size:clamp(64px,20vw,104px);line-height:1.6;direction:rtl;text-align:center;color:var(--ink);margin:0 0 6px}
.qd-fam{font-size:clamp(52px,15vw,84px);word-spacing:.25em}
.qd-qbig{font-size:clamp(52px,16vw,80px);margin:4px 0 14px}
.qd-rows{display:grid;gap:10px;max-width:480px;margin:10px auto 6px;text-align:start}
.qd-row{display:flex;align-items:center;gap:14px;padding:10px 16px;border-radius:14px;background:color-mix(in srgb,var(--brand) 7%,transparent);font-size:18px;line-height:1.5}
.qd-lead{font-family:"Amiri Quran",serif;font-size:34px;line-height:2.1;min-width:60px;text-align:center;flex:none;direction:rtl}
.qd-k{color:var(--muted);font-size:15px;min-width:86px;flex:none}
.qmk .ovb{color:var(--ink);-webkit-text-stroke:0}
.qmk .ovt{-webkit-text-stroke:.09em var(--qbg,var(--surface))}
.qd-row .qmk .ovt{--qbg:color-mix(in srgb,var(--brand) 7%,var(--surface))}
.qd-hide{color:transparent;-webkit-text-stroke:0!important}
.qd-words{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;direction:rtl;font-family:"Amiri Quran",serif;font-size:32px;line-height:2.2;margin:12px 0 4px}
.qd-words .vw{padding:0 14px;border:1px solid var(--line);border-radius:14px;background:var(--surface);min-height:48px}
.qd-read{font-size:30px}
.qd-end{color:var(--muted);font-size:.8em;align-self:center}
.qd-sub{font-size:15px;color:var(--muted);margin:14px 0 0}
.qd-mouth{max-width:280px;margin:14px auto 0}
.qd-mouth .mx{max-width:240px}
.qd-mxt{font-size:15px;line-height:1.5;padding:8px 12px;border-radius:12px;background:var(--gold-soft);margin-top:6px}
.qd-face{width:104px;height:104px;display:block;margin:4px auto 0}
.qd-beats{display:flex;align-items:center;justify-content:center;gap:8px;margin:10px 0 4px}
.qd-beats i{width:16px;height:16px;border-radius:50%;background:var(--m-mad)}
.qd-beats span{font-size:14px;color:var(--muted);margin-inline-start:6px}
.qd-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(66px,1fr));gap:10px;direction:rtl;margin-top:8px}
.qd-syl{position:relative;font-family:"Amiri Quran",serif;font-size:34px;line-height:2;border:1px solid var(--line);background:var(--surface);border-radius:14px;padding:0;color:var(--ink)}
.qd-syl.snd::after{content:"";position:absolute;top:7px;inset-inline-start:7px;width:6px;height:6px;border-radius:50%;background:var(--brand);opacity:.55}
.qd-syl.on{border-color:var(--ok);box-shadow:0 0 0 2px color-mix(in srgb,var(--ok) 30%,transparent)}
.qd-now{min-height:48px;font-size:15px;color:var(--muted);display:flex;align-items:center;justify-content:center;gap:8px}
.qd-nw{font-family:"Amiri Quran",serif;font-size:28px;line-height:1.8;color:var(--ink)}
.qd-shapes{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;direction:rtl;max-width:440px;margin:6px auto 0}
.qd-shapes div{display:flex;flex-direction:column;align-items:center;padding:6px 2px 10px;border-radius:14px;background:color-mix(in srgb,var(--brand) 7%,transparent)}
.qd-shapes b{font-family:"Amiri Quran",serif;font-size:40px;line-height:1.9;font-weight:400}
.qd-shapes small{font-size:12px;color:var(--muted);line-height:1.2;text-align:center}
.qd-opts{grid-template-columns:repeat(auto-fit,minmax(130px,1fr))}
.opt.qd-ao{align-items:center}
.opt.qd-ao>span{font-family:"Amiri Quran",serif;font-size:34px;line-height:1.9}
.qd-ans{font-family:"Amiri Quran",serif;font-size:28px;margin-inline-start:6px}
.qd-sum{padding:16px 20px;margin:0 0 18px}
.qd-sumrow{display:flex;align-items:baseline;gap:10px}
.qd-sumrow b{font-size:24px}
.qd-sumrow span{color:var(--muted);font-size:14px}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

Object.assign(T.en,{nav_qaida:"Qaida",t_qaida:"Read from the letters up, level by level"});
Object.assign(T.ar,{nav_qaida:"القاعدة",t_qaida:"تعلّم القراءة من الحروف، مستوى بعد مستوى"});
const nav=$("nav");
if(nav&&!nav.querySelector('a[href="#qaida"]')){const a=document.createElement("a");a.href="#qaida";a.innerHTML=`<span data-t="nav_qaida"></span>`;
  const rv=nav.querySelector('a[href="#review"]');nav.insertBefore(a,rv||null)}
views.qaida=qaida;
const home0=views.home;
views.home=function(){home0();const g=app.querySelector("section.grid.g4");
  if(g&&!g.querySelector('[href="#qaida"]'))g.insertAdjacentHTML("afterbegin",`<a class="card tile" href="#qaida"><div class="ic">📚</div><h3>${esc(t("nav_qaida"))}</h3><p>${esc(t("t_qaida"))}</p></a>`)};
applyLang();
if((location.hash||"").slice(1)==="qaida"||current==="home")route();
})();
