/** Bài viết mục "Sống đẹp cùng Mayqueen". Mỗi chuỗi là cặp [tiếng Việt, tiếng Anh]. */
export type L = [string, string];

export type Post = {
  slug: string;
  img: string;
  cat: L;
  title: L;
  excerpt: L;
  minutes: number;
  /** Mỗi phần tử là một đoạn; đoạn bắt đầu bằng "## " là tiêu đề nhỏ. */
  body: L[];
};

export const POSTS: Post[] = [
  {
    slug: "lay-lai-voc-dang-khong-met-moi",
    img: "/img/lay-lai-voc-dang.jpg",
    cat: ["Thực đơn eat clean", "Eat-clean menu"],
    title: ["Lấy lại vóc dáng không mệt mỏi", "Get your shape back, stress-free"],
    excerpt: [
      "Không cần nhịn đói hay tập đến kiệt sức. Một ngày ăn đủ chất, ngủ đủ giấc và thói quen nhỏ lặp lại mỗi ngày mới là thứ giữ dáng lâu dài.",
      "No starving, no exhausting workouts. Balanced meals, good sleep and small daily habits are what keep you in shape for good.",
    ],
    minutes: 4,
    body: [
      ["Phần lớn người bỏ cuộc giữa chừng không phải vì thiếu quyết tâm, mà vì chọn cách quá khắc nghiệt: cắt hẳn tinh bột, bỏ bữa, tập dồn dập. Cơ thể phản ứng bằng cơn đói và mệt mỏi, rồi mọi thứ quay lại như cũ.", "Most people quit not for lack of willpower but because they pick methods that are too harsh: cutting all carbs, skipping meals, cramming workouts. The body answers with hunger and fatigue, and everything slides back."],
      ["## Ăn đủ, chọn đúng", "## Eat enough, choose well"],
      ["Mỗi bữa nên có một nửa đĩa rau, một phần tư đạm như cá, trứng, ức gà hoặc đậu phụ, và một phần tư tinh bột chậm như gạo lứt, khoai lang, yến mạch. Cách chia này giúp no lâu mà không phải đếm calo.", "Fill half the plate with vegetables, a quarter with protein such as fish, eggs, chicken breast or tofu, and a quarter with slow carbs like brown rice, sweet potato or oats. You stay full longer without counting calories."],
      ["## Ngủ trước 23 giờ", "## Sleep before 11 pm"],
      ["Thiếu ngủ làm tăng hormone gây đói và khiến bạn thèm đồ ngọt vào hôm sau. Ngủ đủ 7 đến 8 tiếng là bước giữ dáng dễ nhất mà nhiều người bỏ qua.", "Poor sleep raises hunger hormones and triggers sugar cravings the next day. Seven to eight hours is the easiest shape-keeping step people skip."],
      ["## Thói quen nhỏ, lặp lại", "## Small habits, repeated"],
      ["Đi bộ 20 phút sau bữa tối, uống đủ 1,5 đến 2 lít nước, và một thói quen cố định buổi sáng như uống Mayqueen Slim sau bữa sáng. Những việc nhỏ làm đều đặn sẽ hiệu quả hơn một tuần ép cân.", "A 20-minute walk after dinner, 1.5 to 2 litres of water, and a fixed morning routine such as Mayqueen Slim after breakfast. Small things done consistently beat a week of crash dieting."],
    ],
  },
  {
    slug: "vua-an-xong-lai-thay-doi",
    img: "/img/vua-an-xong-doi.jpg",
    cat: ["Kiến thức", "Knowledge"],
    title: ["Vừa ăn xong lại thấy đói?", "Hungry right after eating?"],
    excerpt: [
      "Cơn đói ngay sau bữa ăn thường là đói giả. Hiểu nguyên nhân giúp bạn bớt ăn vặt mà không phải cố nhịn.",
      "Hunger right after a meal is often false hunger. Knowing why helps you snack less without forcing yourself.",
    ],
    minutes: 3,
    body: [
      ["Nếu chưa đầy một tiếng sau bữa mà bạn đã muốn ăn tiếp, rất có thể đó không phải đói thật. Đói thật đến từ từ và ăn món gì cũng thấy ngon. Đói giả đến đột ngột và chỉ thèm một món cụ thể, thường là đồ ngọt.", "If you want to eat again less than an hour after a meal, it is probably not real hunger. Real hunger builds slowly and any food sounds good. False hunger hits suddenly and craves one specific thing, usually sweets."],
      ["## Ba nguyên nhân thường gặp", "## Three common causes"],
      ["Bữa ăn nhiều tinh bột nhanh như cơm trắng, bánh mì, nước ngọt làm đường huyết lên nhanh rồi tụt nhanh. Bữa ăn thiếu đạm và chất xơ nên không đủ no. Và đôi khi chỉ là khát, căng thẳng hoặc buồn chán.", "Meals heavy in fast carbs like white rice, bread and soft drinks spike then crash your blood sugar. Meals low in protein and fibre don't keep you full. And sometimes it is just thirst, stress or boredom."],
      ["## Cách xử lý", "## What to do"],
      ["Uống một cốc nước và chờ 15 phút. Thêm rau và đạm vào bữa chính. Ăn chậm, nhai kỹ ít nhất 20 phút một bữa để não kịp nhận tín hiệu no. Mayqueen Slim chứa Glucomannan, một loại chất xơ hỗ trợ cảm giác no, phù hợp cho người hay ăn vặt.", "Drink a glass of water and wait 15 minutes. Add vegetables and protein to main meals. Eat slowly for at least 20 minutes so your brain registers fullness. Mayqueen Slim contains Glucomannan, a fibre that supports satiety, which suits frequent snackers."],
    ],
  },
  {
    slug: "tam-biet-bua-an-xa",
    img: "/img/tam-biet-bua-xa.jpg",
    cat: ["Detox", "Detox"],
    title: ["Tạm biệt bữa ăn “xả”", "Goodbye cheat meals"],
    excerpt: [
      "Một bữa “xả” sau cả tuần kiêng khem có thể xoá sạch công sức. Có cách cân bằng hơn mà vẫn được ăn món mình thích.",
      "One cheat meal after a week of restraint can undo all the work. There is a more balanced way that still lets you enjoy your favourites.",
    ],
    minutes: 3,
    body: [
      ["Nhiều người ăn rất kỹ từ thứ Hai đến thứ Sáu rồi “xả” cả cuối tuần. Kết quả là cân nặng dao động liên tục và bụng luôn đầy hơi vào đầu tuần.", "Many people eat strictly Monday to Friday, then let loose all weekend. The result is constant weight swings and a bloated belly every Monday."],
      ["## Quy tắc 80/20", "## The 80/20 rule"],
      ["Ăn lành mạnh 80% số bữa, 20% còn lại thoải mái nhưng có chừng mực. Chia món mình thích thành phần nhỏ trải đều trong tuần thay vì dồn vào một bữa.", "Eat well for 80% of meals and enjoy the other 20% in moderation. Spread small portions of your favourites across the week instead of one big blowout."],
      ["## Sau một bữa nhiều dầu mỡ", "## After a heavy meal"],
      ["Uống nhiều nước, ưu tiên rau xanh và món nhẹ ở bữa kế tiếp, đi bộ nhẹ. Buổi tối, một cốc Yodetox Extra ấm giúp hệ tiêu hoá nhẹ nhàng hơn. Không cần nhịn ăn bù vì sẽ dễ dẫn đến bữa “xả” tiếp theo.", "Drink plenty of water, choose greens and light dishes at the next meal, and take a gentle walk. At night, a warm cup of Yodetox Extra helps digestion feel lighter. Skip the compensating fast, which only leads to the next binge."],
    ],
  },
  {
    slug: "an-qua-it-co-giup-giam-mo",
    img: "/img/an-qua-it.jpg",
    cat: ["Kiến thức", "Knowledge"],
    title: ["Ăn quá ít có giúp giảm mỡ?", "Does eating too little burn fat?"],
    excerpt: [
      "Cắt giảm ăn uống quá mức khiến cơ thể chuyển sang chế độ tiết kiệm năng lượng. Cân có thể giảm, nhưng mỡ thì chưa chắc.",
      "Eating too little pushes the body into energy-saving mode. The scale may drop, but fat may not.",
    ],
    minutes: 4,
    body: [
      ["Khi nạp quá ít năng lượng, cơ thể lấy năng lượng từ cả cơ bắp chứ không chỉ từ mỡ. Mất cơ làm quá trình trao đổi chất chậm lại, nên khi ăn bình thường trở lại bạn tăng cân nhanh hơn trước.", "When you eat too little, the body draws energy from muscle as well as fat. Losing muscle slows your metabolism, so you regain weight faster once you eat normally again."],
      ["## Giảm cân khác giảm mỡ", "## Weight loss is not fat loss"],
      ["Con số trên cân gồm nước, cơ, mỡ và thức ăn trong ruột. Giảm mỡ thật thể hiện ở vòng eo nhỏ lại, quần áo rộng hơn và cơ thể săn chắc hơn, chứ không chỉ ở số cân.", "The scale counts water, muscle, fat and food in your gut. Real fat loss shows in a smaller waist, looser clothes and a firmer body, not just the number."],
      ["## Nên làm gì", "## What works better"],
      ["Giảm nhẹ khoảng 300 đến 500 kcal mỗi ngày so với nhu cầu, ăn đủ đạm và tập sức bền kết hợp vận động nhẹ. Tốc độ an toàn là 0,5 đến 1 kg mỗi tuần.", "Cut a modest 300 to 500 kcal a day below your needs, eat enough protein and combine strength training with light activity. A safe pace is 0.5 to 1 kg a week."],
    ],
  },
  {
    slug: "sau-tuoi-30-can-nang-kho-kiem-soat",
    img: "/img/sau-tuoi-30.jpg",
    cat: ["Kiến thức", "Knowledge"],
    title: ["Vì sao sau tuổi 30 cân nặng khó kiểm soát?", "Why is weight harder to control after 30?"],
    excerpt: [
      "Ăn y như trước mà vẫn tăng cân? Sau 30 tuổi, cơ thể đốt năng lượng chậm hơn và cần cách chăm sóc khác.",
      "Eating the same but still gaining? After 30 your body burns energy more slowly and needs a different approach.",
    ],
    minutes: 4,
    body: [
      ["Từ khoảng 30 tuổi, khối cơ giảm dần nếu không vận động, kéo theo mức năng lượng tiêu hao lúc nghỉ ngơi cũng giảm. Cùng một khẩu phần, cơ thể dư ra nhiều hơn và tích lại thành mỡ, nhất là vùng bụng.", "From around 30, muscle mass slowly declines without exercise, and so does the energy you burn at rest. The same portion now leaves more surplus, which is stored as fat, especially around the belly."],
      ["## Ba điều nên thay đổi", "## Three things to change"],
      ["Thêm hai buổi tập sức bền mỗi tuần để giữ cơ. Tăng đạm và rau, giảm đồ uống có đường. Quản lý căng thẳng và giấc ngủ, vì cả hai đều ảnh hưởng trực tiếp đến mỡ bụng.", "Add two strength sessions a week to keep muscle. Increase protein and vegetables, cut sugary drinks. Manage stress and sleep, as both directly affect belly fat."],
      ["## Kiên nhẫn với cơ thể", "## Be patient with your body"],
      ["Thay đổi ở tuổi này cần thời gian hơn. Một liệu trình đều đặn 30 ngày, kết hợp ăn uống và vận động, sẽ cho kết quả bền hơn mọi phương pháp cấp tốc.", "Change takes longer at this age. A steady 30-day routine with good food and movement gives more lasting results than any quick fix."],
    ],
  },
  {
    slug: "dung-chi-nhin-vao-so-can",
    img: "/img/dung-nhin-so-can.jpg",
    cat: ["Giữ dáng", "Keep shape"],
    title: ["Đừng chỉ nhìn vào số cân", "Don't just watch the scale"],
    excerpt: [
      "Cân nặng lên xuống mỗi ngày là bình thường. Có những chỉ số khác phản ánh tiến bộ của bạn chính xác hơn.",
      "Daily weight swings are normal. Other measures show your progress more accurately.",
    ],
    minutes: 3,
    body: [
      ["Cân nặng có thể dao động 1 đến 2 kg chỉ trong một ngày do nước, muối và thức ăn. Cân mỗi sáng rồi lo lắng vì một con số dễ khiến bạn bỏ cuộc sớm.", "Weight can swing 1 to 2 kg in a single day from water, salt and food. Weighing every morning and worrying over one number makes it easy to quit early."],
      ["## Theo dõi gì thay thế", "## What to track instead"],
      ["Đo vòng eo mỗi tuần một lần vào cùng một thời điểm. Chụp ảnh cùng góc mỗi hai tuần. Để ý quần áo, năng lượng trong ngày và chất lượng giấc ngủ.", "Measure your waist once a week at the same time. Take photos from the same angle every two weeks. Notice how clothes fit, your daily energy and sleep quality."],
      ["## Nếu vẫn muốn cân", "## If you still weigh in"],
      ["Cân một lần mỗi tuần, buổi sáng sau khi đi vệ sinh và trước khi ăn. Nhìn vào xu hướng của cả tháng thay vì từng ngày.", "Weigh once a week, in the morning after the bathroom and before eating. Look at the monthly trend rather than single days."],
    ],
  },
];

export const POST_BY_SLUG: Record<string, Post> = Object.fromEntries(POSTS.map((p) => [p.slug, p]));
