VERSION = ARGV[0]
SEED = 100

if VERSION.nil? || VERSION.empty? || !VERSION.match(/^v\d+$/)
  raise "VERSION must be v[0-9]+"
  exit(1)
end

SEED_CODE = SEED.times.map {"TaskSeeds();"}.join(" ")
CYLOG_CODE = <<EOS
//////////////////////////////////////////////////
Schema:
  TaskSeeds(
     tid          int:auto_increment;
   )key(tid);

  FeedBackStore(
    tid           int;
    corrections   text; // 投票されたセッションの結果
    tag           text; // セッションのバージョン
    uid           char(32); // ワーカーのID
  )key(tid);

  !FeedBackTask(
    tid           int;
    _open_fact_id int;
  );

//////////////////////////////////////////////////
Rules:
  // #{SEED}個シードを用意する
  #{SEED_CODE}

  FeedBackStore(tid, uid, tag, corrections)/open <-
    TaskSeeds(tid);

  !FeedBackTask(_open_fact_id, tid) <-
    ?FeedBackStore(_fact_id:_open_fact_id, tid);

  TaskSeeds() <-
    FeedBackStore(tid);

//////////////////////////////////////////////////
Views:
  !FeedBackTask(_open_fact_id, tid) {
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
      <link rel="stylesheet" href="//oahu.slis.tsukuba.ac.jp/nkobayashi/feedback/#{VERSION}/main.css" />
      <script src="//oahu.slis.tsukuba.ac.jp/nkobayashi/feedback/#{VERSION}/main.js"></script>
      <div id='app-root'></div>

      <form fact=FeedBackStore(tid, corrections, tag, uid, _open_fact_id) move=!Thanks() name='store'>
        <input type='hidden' name='tid' />
        <input type='hidden' name='tag' />
        <input type='hidden' name='corrections' />
        <input type='hidden' name='uid' />
      </form>
    </div>
  }

  !Thanks() {
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css" integrity="sha256-g4+HzlttFiqgeuCnx3m308o0ahuBZ+0CRxaRWfSL0BU=" crossorigin="anonymous" />
      <script src='https://code.jquery.com/jquery-3.1.1.min.js' integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.js" integrity="sha256-Wl7niWgEJX3PdPn8lBzIDCWO1FBCYExjQihbT4ldMok=" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" integrity="sha256-KM512VNnjElC30ehFwehXjx1YCHPiQkOPmqnrWtpccM=" crossorigin="anonymous"></script>
      <script src="//oahu.slis.tsukuba.ac.jp/nkobayashi/thanks.js"></script>

      <div id='app-root'></div>
    </div>
  }
EOS

File.open("cylogs/feedback_task_#{VERSION}.cylog", "w") do |file|
  file << CYLOG_CODE
end
