import $ from "jquery";

const randomstr = function(length) {
  var s = "";
  length = length || 32;
  for (var i = 0; i < length; i++) {
    var random = (Math.random() * 16) | 0;
    s += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }
  return s;
};

export const submit = corrections => {
  const stringifyCorrections = JSON.stringify(corrections);
  var $uid = localStorage.user;
  if (!$uid) {
    $uid = randomstr();
    localStorage.user = $uid;
  }

  // !!本番ではコメントアウトを取る!!
  var $store = $("[name=store]")[0];
  var tasks = {
    tid: $store._FACT1___tid.value,
    uid: $uid,
    corrections: stringifyCorrections,
  };

  console.log(tasks);

  $($store.tid).val(tasks.tid);
  $($store.uid).val(tasks.uid);
  $($store.corrections).val(tasks.corrections);
  $($store).submit();
};
