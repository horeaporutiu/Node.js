//This function modifies Watson language translation options based on what user picks.
//Watson can only do certain domains.
function langTest() {
  //Disable the user from picking English as output at the start of the program,
  //since English is by default the input
  targetLang.options[1].disabled = true;
  var sourceLang = document.getElementById("source").value;
  for (i = 0; i < targetLang.options.length; ++i) {
    targetLang.value = "English";
    targetLang.options[i].disabled = false;
  }
  if (sourceLang != "English") {
    for (i = 0; i < targetLang.options.length; ++i) {
      targetLang.value = "English";
      //diable all options since Watson tranlslates from
      //Arabic, Spanish, French and Portueguese to English only.
      if (targetLang.options[i].value != "English") {
        targetLang.options[i].disabled = true;
      }
    }
  }
  //Don't let user try to translate from English to English..doesn't make sense.
  else {
    targetLang.value = "Spanish";
    targetLang.options[1].disabled = true;
  }
}
