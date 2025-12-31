import { CardData, TarotConfig, TarotTopic } from "../../types/tarot";

export const TAROT_DATA: CardData[] = [
  // Major Arcana (0-21)
  {
    name: "The Fool",
    url: require("../../../assets/png/tarot/00_fool.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Một khởi đầu mới đầy lãng mạn, sự ngây thơ và tin tưởng tuyệt đối. Bạn có thể sắp bước vào một mối quan hệ bất ngờ.",
      "cong-viec":
        "Cơ hội thử sức ở lĩnh vực mới. Hãy dám mạo hiểm và suy nghĩ khác biệt, đừng ngại những con đường chưa ai đi.",
      "tai-chinh":
        "Có thể có khoản chi bất ngờ hoặc cơ hội đầu tư mới mẻ. Hãy cẩn trọng nhưng đừng để nỗi sợ cản bước.",
      "hoc-tap":
        "Giai đoạn tốt để bắt đầu một môn học mới hoặc phương pháp học tập mới mẻ, tự do.",
      "suc-khoe":
        "Năng lượng dồi dào, nhưng hãy cẩn thận với những tai nạn nhỏ do sự bất cẩn.",
      "gia-dinh":
        "Sự hồn nhiên mang lại niềm vui cho gia đình, hoặc một thành viên mới (thú cưng, em bé) sắp xuất hiện.",
    },
  },
  {
    name: "The Magician",
    url: require("../../../assets/png/tarot/01_magician.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Bạn có đầy đủ sức hút và khả năng để chinh phục đối phương. Hãy chủ động tạo ra phép màu trong tình yêu.",
      "cong-viec":
        "Thời điểm vàng để triển khai dự án. Kỹ năng của bạn đang ở độ chín, hãy tận dụng mọi nguồn lực.",
      "tai-chinh":
        "Khả năng kiếm tiền tốt nhờ vào tài năng và sự linh hoạt. Bạn nắm quyền chủ động trong các giao dịch.",
      "hoc-tap":
        "Sự tập trung và kỷ luật giúp bạn đạt kết quả cao. Bạn có đủ khả năng để làm chủ kiến thức.",
      "suc-khoe":
        "Sức khỏe tốt, khả năng hồi phục nhanh chóng nhờ ý chí mạnh mẽ.",
      "gia-dinh":
        "Khả năng giải quyết các vấn đề gia đình một cách khéo léo và hiệu quả.",
    },
  },
  {
    name: "The High Priestess",
    url: require("../../../assets/png/tarot/02_high_priestess.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Một mối quan hệ tâm giao, sâu sắc nhưng kín đáo. Hãy lắng nghe trực giác và chờ đợi tín hiệu từ trái tim.",
      "cong-viec":
        "Nên giữ bí mật các kế hoạch quan trọng. Nghiên cứu sâu và sự kiên nhẫn sẽ mang lại lợi thế lớn.",
      "tai-chinh":
        "Tin vào trực giác trong các quyết định đầu tư. Có những yếu tố ẩn chưa lộ diện, hãy cẩn trọng.",
      "hoc-tap":
        "Thích hợp cho việc nghiên cứu sâu, học các môn tâm lý, triết học hoặc nghệ thuật.",
      "suc-khoe":
        "Chú ý đến sức khỏe tinh thần và hệ nội tiết. Hãy lắng nghe cơ thể mình.",
      "gia-dinh":
        "Người phụ nữ lớn tuổi hoặc người mẹ đóng vai trò quan trọng, mang lại sự thấu hiểu thầm lặng.",
    },
  },
  {
    name: "The Empress",
    url: require("../../../assets/png/tarot/03_empress.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Sự viên mãn, hạnh phúc và đam mê. Mối quan hệ đầy sự quan tâm, chăm sóc, có thể tiến tới hôn nhân.",
      "cong-viec":
        "Môi trường làm việc thuận lợi, sáng tạo phát triển. Thành quả đang đến gần, dự án sẽ sinh lợi.",
      "tai-chinh":
        "Sự sung túc, thịnh vượng. Đầu tư vào cái đẹp, thời trang hoặc tiện nghi gia đình sẽ sinh lời.",
      "hoc-tap":
        "Việc học tập trôi chảy, khả năng tiếp thu tốt, đặc biệt là các môn nghệ thuật.",
      "suc-khoe":
        "Sức khỏe dồi dào, có thể liên quan đến việc mang thai hoặc sinh nở.",
      "gia-dinh":
        "Gia đình hạnh phúc, sung túc. Người mẹ là trung tâm của tình yêu thương và sự chăm sóc.",
    },
  },
  {
    name: "The Emperor",
    url: require("../../../assets/png/tarot/04_emperor.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Mối quan hệ bền vững, có cam kết nhưng hơi khô khan. Đối phương là người đáng tin cậy, che chở.",
      "cong-viec":
        "Cần sự kỷ luật, tổ chức và vai trò lãnh đạo. Sự ổn định và thăng tiến đến từ nỗ lực có kế hoạch.",
      "tai-chinh":
        "Tài chính vững chắc, quản lý tiền bạc chặt chẽ. Đầu tư vào bất động sản hoặc các kênh an toàn.",
      "hoc-tap":
        "Cần có kế hoạch học tập nghiêm túc và kỷ luật sắt đá để đạt thành tích cao.",
      "suc-khoe":
        "Cần duy trì chế độ sinh hoạt điều độ. Chú ý các vấn đề về xương khớp hoặc đầu.",
      "gia-dinh":
        "Người cha hoặc người trụ cột đóng vai trò quyết định, mang lại sự an toàn và nề nếp.",
    },
  },
  {
    name: "The Hierophant",
    url: require("../../../assets/png/tarot/05_hierophant.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Mối quan hệ truyền thống, nghiêm túc, có thể dẫn tới hôn nhân hoặc cam kết lâu dài.",
      "cong-viec":
        "Làm việc theo quy trình, tôn trọng cấp trên và văn hóa công ty. Tìm kiếm mentor.",
      "tai-chinh":
        "Đầu tư an toàn, truyền thống. Tránh rủi ro mạo hiểm, quản lý tiền bạc theo cách cổ điển.",
      "hoc-tap":
        "Học tập trong môi trường chính quy, tôn trọng thầy cô và kiến thức nền tảng.",
      "suc-khoe":
        "Tuân thủ phác đồ điều trị của bác sĩ, áp dụng các phương pháp chữa trị truyền thống.",
      "gia-dinh":
        "Gia đình nề nếp, tôn trọng giá trị truyền thống và sự gắn kết giữa các thế hệ.",
    },
  },
  {
    name: "The Lovers",
    url: require("../../../assets/png/tarot/06_lovers.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Tình yêu lãng mạn, sự hòa hợp tâm hồn. Đứng trước lựa chọn quan trọng trong tình cảm.",
      "cong-viec":
        "Hợp tác kinh doanh thuận lợi. Cần đưa ra lựa chọn nghề nghiệp dựa trên đam mê.",
      "tai-chinh":
        "Cần cân nhắc kỹ trước các quyết định chi tiêu lớn. Hợp tác tài chính có lợi.",
      "hoc-tap":
        "Lựa chọn ngành học yêu thích. Tìm được bạn học hoặc nhóm học tập hợp ý.",
      "suc-khoe":
        "Cần cân bằng giữa sức khỏe thể chất và tinh thần. Chú ý các bệnh về tim mạch.",
      "gia-dinh":
        "Sự hòa thuận, yêu thương trong gia đình. Cần giải quyết mâu thuẫn bằng tình cảm.",
    },
  },
  {
    name: "The Chariot",
    url: require("../../../assets/png/tarot/07_chariot.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Chinh phục người mình yêu, vượt qua rào cản. Mối quan hệ tiến triển nhanh chóng.",
      "cong-viec":
        "Thăng tiến, đạt được mục tiêu nhờ sự quyết đoán và nỗ lực không ngừng.",
      "tai-chinh":
        "Kiểm soát tốt tài chính, nỗ lực kiếm tiền sẽ được đền đáp xứng đáng.",
      "hoc-tap":
        "Đạt kết quả cao trong thi cử nhờ sự tập trung và ý chí kiên cường.",
      "suc-khoe":
        "Sức khỏe dồi dào, nhưng cần tránh làm việc quá sức hoặc lái xe ẩu.",
      "gia-dinh":
        "Giải quyết được các vấn đề gia đình tồn đọng nhờ sự chủ động.",
    },
  },
  {
    name: "Strength",
    url: require("../../../assets/png/tarot/08_strength.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Mối quan hệ bền vững dựa trên sự thấu hiểu và nhẫn nại. Vượt qua thử thách cùng nhau.",
      "cong-viec":
        "Giải quyết khó khăn bằng sự mềm mỏng, ngoại giao khéo léo. Kiên trì sẽ thành công.",
      "tai-chinh":
        "Quản lý tài chính ổn định. Cần kiên nhẫn tích lũy để đạt mục tiêu lớn.",
      "hoc-tap": "Kiên trì học tập, vượt qua áp lực thi cử bằng sự bình tĩnh.",
      "suc-khoe":
        "Sức đề kháng tốt, hồi phục nhanh. Cần duy trì lối sống lành mạnh.",
      "gia-dinh":
        "Là chỗ dựa tinh thần vững chắc cho gia đình. Hòa giải mâu thuẫn bằng sự dịu dàng.",
    },
  },
  {
    name: "The Hermit",
    url: require("../../../assets/png/tarot/09_hermit.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Giai đoạn cần ở một mình để suy ngẫm về tình cảm. Tình yêu chín chắn, không ồn ào.",
      "cong-viec":
        "Tự nghiên cứu, làm việc độc lập. Thời gian để trau dồi kỹ năng chuyên môn sâu.",
      "tai-chinh":
        "Tiết kiệm, chi tiêu cẩn trọng. Tránh đầu tư mạo hiểm, nên giữ tiền.",
      "hoc-tap":
        "Tập trung nghiên cứu chuyên sâu, tự học hiệu quả hơn học nhóm.",
      "suc-khoe":
        "Cần nghỉ ngơi, tĩnh dưỡng. Chú ý các bệnh về người già hoặc xương khớp.",
      "gia-dinh":
        "Cần không gian riêng tư. Đôi khi cảm thấy cô đơn giữa người thân.",
    },
  },
  {
    name: "Wheel of Fortune",
    url: require("../../../assets/png/tarot/10_wheel.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Bước ngoặt trong tình cảm, định mệnh sắp đặt. Cuộc gặp gỡ tình cờ nhưng quan trọng.",
      "cong-viec":
        "Cơ hội thăng tiến bất ngờ hoặc thay đổi công việc tích cực. Vận may đang tới.",
      "tai-chinh":
        "Biến động tài chính, có thể có khoản thu bất ngờ. Nắm bắt cơ hội đầu tư.",
      "hoc-tap":
        "Kết quả thi cử phụ thuộc vào may mắn một phần. Có thay đổi trong định hướng học tập.",
      "suc-khoe":
        "Sự thay đổi về sức khỏe, cần chú ý chu kỳ sinh học của cơ thể.",
      "gia-dinh":
        "Những thay đổi lớn trong gia đình như chuyển nhà, thay đổi lối sống.",
    },
  },
  {
    name: "Justice",
    url: require("../../../assets/png/tarot/11_justice.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Tình yêu cần sự công bằng, tôn trọng lẫn nhau. Giải quyết mâu thuẫn bằng lý trí.",
      "cong-viec":
        "Ký kết hợp đồng, văn bản pháp lý. Môi trường làm việc công bằng, minh bạch.",
      "tai-chinh":
        "Cân đối thu chi. Các vấn đề pháp lý liên quan đến tiền bạc sẽ được giải quyết.",
      "hoc-tap":
        "Kết quả phản ánh đúng nỗ lực bỏ ra. Thi cử nghiêm túc, công bằng.",
      "suc-khoe":
        "Cân bằng chế độ ăn uống và sinh hoạt. Sức khỏe ổn định nếu giữ kỷ luật.",
      "gia-dinh":
        "Giải quyết các vấn đề thừa kế, giấy tờ hoặc mâu thuẫn gia đình một cách công lý.",
    },
  },
  {
    name: "The Hanged Man",
    url: require("../../../assets/png/tarot/12_hanged_man.jpg"),
    topicMeanings: {
      "tinh-duyen":
        'Tạm dừng yêu đương để chữa lành bản thân. Mối quan hệ "đóng băng" tạm thời.',
      "cong-viec":
        "Xin nghỉ phép, du lịch để giảm stress. Tạm gác lại công việc bề bộn.",
      "tai-chinh": "Không có biến động lớn. Nên giữ tiền và án binh bất động.",
      "hoc-tap": "Nghỉ ngơi sau kỳ thi căng thẳng. Cần thư giãn đầu óc.",
      "suc-khoe": "Cần ngủ đủ giấc, đi spa hoặc thiền định. Hồi phục sau bệnh.",
      "gia-dinh":
        "Không khí gia đình trầm lắng, mọi người cần không gian riêng.",
    },
  },
  {
    name: "Death",
    url: require("../../../assets/png/tarot/13_death.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Kết thúc một mối quan hệ không còn phù hợp hoặc thay đổi hoàn toàn cách yêu.",
      "cong-viec":
        "Thay đổi công việc, thất nghiệp tạm thời để tìm hướng đi mới phù hợp hơn.",
      "tai-chinh":
        "Mất mát tài chính nhỏ để học bài học lớn. Thay đổi cách quản lý tiền bạc.",
      "hoc-tap":
        "Kết thúc khóa học, thay đổi ngành học. Một cánh cửa đóng lại, cánh cửa khác mở ra.",
      "suc-khoe":
        "Hồi phục sau bệnh tật, thay đổi hoàn toàn lối sống để khỏe mạnh hơn.",
      "gia-dinh":
        "Những thay đổi lớn trong cấu trúc gia đình, sự chia ly hoặc đoàn tụ.",
    },
  },
  {
    name: "Temperance",
    url: require("../../../assets/png/tarot/14_temperance.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Tình cảm hài hòa, êm đềm. Hai bên biết lắng nghe và dung hòa sự khác biệt.",
      "cong-viec":
        "Môi trường làm việc thoải mái, đồng nghiệp hỗ trợ. Cần kiên nhẫn để thăng tiến.",
      "tai-chinh":
        "Tài chính ổn định, thu chi cân đối. Tránh đầu tư mạo hiểm, nên tích lũy đều đặn.",
      "hoc-tap": "Học tập đều đặn, kết hợp tốt giữa lý thuyết và thực hành.",
      "suc-khoe":
        "Sức khỏe hồi phục tốt nhờ cân bằng sinh hoạt. Tinh thần thư thái.",
      "gia-dinh":
        "Gia đình hòa thuận, êm ấm. Giải quyết mâu thuẫn bằng sự nhường nhịn.",
    },
  },
  {
    name: "The Devil",
    url: require("../../../assets/png/tarot/15_devil.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Mối quan hệ độc hại, phụ thuộc hoặc quá thiên về dục vọng. Cần thoát ra.",
      "cong-viec":
        "Bị ràng buộc bởi hợp đồng bất lợi hoặc môi trường làm việc độc hại, áp lực.",
      "tai-chinh":
        "Nợ nần, chi tiêu không kiểm soát. Cẩn thận các cám dỗ làm giàu nhanh.",
      "hoc-tap":
        "Bị xao nhãng bởi các thú vui bên ngoài, lười biếng hoặc áp lực quá lớn.",
      "suc-khoe":
        "Các vấn đề về nghiện ngập (thuốc lá, rượu...), căng thẳng thần kinh.",
      "gia-dinh":
        "Mâu thuẫn gia đình do sự kiểm soát quá mức hoặc vấn đề tài chính.",
    },
  },
  {
    name: "The Tower",
    url: require("../../../assets/png/tarot/16_tower.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Chia tay đột ngột, cú sốc tình cảm, sự thật phơi bày gây đổ vỡ.",
      "cong-viec":
        "Mất việc bất ngờ, công ty phá sản hoặc thay đổi cơ cấu lớn.",
      "tai-chinh":
        "Mất mát tài sản lớn, thua lỗ chứng khoán hoặc tai nạn tốn kém.",
      "hoc-tap": "Kết quả thi cử thảm hại, bị đình chỉ học hoặc phải thi lại.",
      "suc-khoe": "Tai nạn bất ngờ, bệnh cấp tính hoặc phẫu thuật khẩn cấp.",
      "gia-dinh": "Gia đình ly tán, mâu thuẫn bùng nổ hoặc mất nhà cửa.",
    },
  },
  {
    name: "The Star",
    url: require("../../../assets/png/tarot/17_star.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Tình yêu lãng mạn, chữa lành vết thương cũ. Hy vọng vào tương lai tươi sáng.",
      "cong-viec":
        "Cơ hội mới đầy hứa hẹn, tìm thấy đam mê và định hướng nghề nghiệp.",
      "tai-chinh": "Tài chính khởi sắc, có triển vọng tốt trong dài hạn.",
      "hoc-tap": "Đạt được thành tích cao, tìm thấy niềm vui trong việc học.",
      "suc-khoe": "Hồi phục kỳ diệu, tinh thần lạc quan giúp cơ thể khỏe mạnh.",
      "gia-dinh": "Gia đình bình yên, niềm vui và sự hòa hợp quay trở lại.",
    },
  },
  {
    name: "The Moon",
    url: require("../../../assets/png/tarot/18_moon.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Sự lừa dối, mơ hồ hoặc lo lắng trong tình cảm. Cẩn thận với những hiểu lầm.",
      "cong-viec":
        "Thiếu thông tin, môi trường làm việc không minh bạch. Cẩn trọng tiểu nhân.",
      "tai-chinh":
        "Rủi ro tiềm ẩn, không nên đầu tư lớn lúc này. Cẩn thận bị lừa đảo.",
      "hoc-tap":
        "Mất phương hướng, khó tập trung. Cần xác định lại mục tiêu rõ ràng.",
      "suc-khoe": "Vấn đề về tâm lý, mất ngủ hoặc các bệnh phụ khoa/nội tiết.",
      "gia-dinh":
        "Bí mật gia đình, sự nghi ngờ hoặc lo lắng giữa các thành viên.",
    },
  },
  {
    name: "The Sun",
    url: require("../../../assets/png/tarot/19_sun.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Tình yêu lãng mạn, chữa lành vết thương cũ. Hy vọng vào tương lai tươi sáng.",
      "cong-viec":
        "Cơ hội mới đầy hứa hẹn, tìm thấy đam mê và định hướng nghề nghiệp.",
      "tai-chinh": "Tài chính khởi sắc, có triển vọng tốt trong dài hạn.",
      "hoc-tap": "Đạt được thành tích cao, tìm thấy niềm vui trong việc học.",
      "suc-khoe": "Hồi phục kỳ diệu, tinh thần lạc quan giúp cơ thể khỏe mạnh.",
      "gia-dinh": "Gia đình bình yên, niềm vui và sự hòa hợp quay trở lại.",
    },
  },
  {
    name: "Judgement",
    url: require("../../../assets/png/tarot/20_judgement.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Sự tha thứ, làm mới lại mối quan hệ hoặc quyết định dứt khoát để tìm hạnh phúc mới.",
      "cong-viec":
        "Được đánh giá năng lực, nhận kết quả xứng đáng. Cơ hội thay đổi nghề nghiệp.",
      "tai-chinh":
        "Kết quả tài chính rõ ràng. Giải quyết xong nợ nần hoặc nhận được phán quyết có lợi.",
      "hoc-tap":
        "Nhận kết quả thi cử quan trọng. Đánh giá lại quá trình học tập.",
      "suc-khoe":
        "Quyết tâm thay đổi lối sống để khỏe mạnh hơn. Hồi phục sau bạo bệnh.",
      "gia-dinh": "Giải quyết mâu thuẫn cũ, sự tha thứ và gắn kết gia đình.",
    },
  },
  {
    name: "The World",
    url: require("../../../assets/png/tarot/21_world.jpg"),
    topicMeanings: {
      "tinh-duyen": "Tình yêu viên mãn, cái kết có hậu. Hạnh phúc trọn vẹn.",
      "cong-viec":
        "Hoàn thành dự án lớn, đạt được đỉnh cao sự nghiệp. Có thể đi công tác xa.",
      "tai-chinh":
        "Thành công rực rỡ về tài chính, sung túc và an toàn tuyệt đối.",
      "hoc-tap":
        "Tốt nghiệp, hoàn thành khóa học với kết quả xuất sắc. Du học.",
      "suc-khoe": "Sức khỏe hoàn hảo, tinh thần và thể chất hòa hợp.",
      "gia-dinh":
        "Gia đình sum họp, hạnh phúc trọn vẹn. Du lịch cùng gia đình.",
    },
  },

  // Wands
  {
    name: "Ace of Wands",
    url: require("../../../assets/png/tarot/wands_01.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Một khởi đầu lãng mạn đầy đam mê và nhiệt huyết. Có thể gặp tiếng sét ái tình.",
      "cong-viec":
        "Khởi động dự án mới đầy hứa hẹn. Có động lực mạnh mẽ để bắt đầu công việc kinh doanh.",
      "tai-chinh": "Cơ hội tài chính mới xuất hiện, cần nắm bắt nhanh chóng.",
      "hoc-tap":
        "Có hứng thú và động lực lớn với môn học mới. Ý tưởng sáng tạo cho bài luận.",
      "suc-khoe":
        "Năng lượng dồi dào, sức khỏe tráng kiện. Nên bắt đầu chế độ tập luyện mới.",
      "gia-dinh":
        "Tin vui về việc sinh nở hoặc một thành viên mới gia nhập gia đình.",
    },
  },
  {
    name: "Two of Wands",
    url: require("../../../assets/png/tarot/wands_02.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Đứng trước lựa chọn giữa hai người hoặc hai hướng đi trong tình cảm. Cần quyết định.",
      "cong-viec":
        "Lập kế hoạch chiến lược dài hạn. Cân nhắc mở rộng kinh doanh hoặc thay đổi hướng đi.",
      "tai-chinh":
        "Đánh giá lại các khoản đầu tư, tìm kiếm cơ hội tài chính ở nơi xa.",
      "hoc-tap":
        "Lên kế hoạch du học hoặc chọn trường. Cân nhắc các lựa chọn tương lai.",
      "suc-khoe": "Cần cân bằng giữa làm việc và nghỉ ngơi để tránh kiệt sức.",
      "gia-dinh":
        "Dự định chuyển nhà hoặc đi du lịch xa cùng gia đình đang được bàn tính.",
    },
  },
  {
    name: "Three of Wands",
    url: require("../../../assets/png/tarot/wands_03.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Chờ đợi người yêu ở xa hoặc mong chờ một bước tiến mới trong mối quan hệ.",
      "cong-viec":
        "Mở rộng thị trường, hợp tác quốc tế. Những nỗ lực ban đầu bắt đầu có kết quả.",
      "tai-chinh":
        "Đầu tư dài hạn bắt đầu sinh lời. Có thể có thu nhập từ nước ngoài.",
      "hoc-tap":
        "Cơ hội du học hoặc tham gia các khóa học quốc tế đang rộng mở.",
      "suc-khoe":
        "Sức khỏe ổn định, nên tham gia các hoạt động ngoài trời để tăng cường thể lực.",
      "gia-dinh": "Gia đình đoàn tụ hoặc có chuyến đi xa cùng nhau.",
    },
  },
  {
    name: "Four of Wands",
    url: require("../../../assets/png/tarot/wands_04.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Đám cưới, tiệc đính hôn hoặc giai đoạn trăng mật ngọt ngào. Hạnh phúc viên mãn.",
      "cong-viec":
        "Ăn mừng thành công dự án, sự kiện công ty thành công. Môi trường làm việc vui vẻ.",
      "tai-chinh":
        "Tài chính ổn định, dư dả để chi tiêu cho các buổi tiệc tùng, lễ hội.",
      "hoc-tap":
        "Hoàn thành khóa học, lễ tốt nghiệp hoặc đạt được thành tích đáng ăn mừng.",
      "suc-khoe":
        "Tinh thần phấn chấn, sức khỏe tốt. Cần chú ý ăn uống trong các buổi tiệc.",
      "gia-dinh":
        "Gia đình sum họp, tiệc tùng vui vẻ. Mua nhà mới hoặc sửa sang nhà cửa.",
    },
  },
  {
    name: "Five of Wands",
    url: require("../../../assets/png/tarot/wands_05.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Mâu thuẫn nhỏ, tranh cãi vụn vặt nhưng không quá nghiêm trọng. Cần nhường nhịn.",
      "cong-viec":
        "Môi trường cạnh tranh cao, nhiều đối thủ. Cần nỗ lực để khẳng định bản thân.",
      "tai-chinh":
        "Tranh chấp tài chính nhỏ, hoặc phải chi tiền để giải quyết rắc rối.",
      "hoc-tap":
        "Thi đua gay gắt trong lớp học. Áp lực từ bạn bè đồng trang lứa.",
      "suc-khoe":
        "Căng thẳng do áp lực. Dễ bị viêm nhiễm hoặc chấn thương nhẹ khi vận động.",
      "gia-dinh":
        "Bất đồng quan điểm giữa các thành viên, ồn ào nhưng không đổ vỡ.",
    },
  },
  {
    name: "Six of Wands",
    url: require("../../../assets/png/tarot/wands_06.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Chinh phục được người trong mộng. Được mọi người ủng hộ mối quan hệ.",
      "cong-viec":
        "Được thăng chức, khen thưởng hoặc công nhận năng lực. Thành công rực rỡ.",
      "tai-chinh":
        "Thưởng lớn, tăng lương hoặc đầu tư thắng lợi. Tài chính dư dả.",
      "hoc-tap": "Đỗ đạt thủ khoa, nhận học bổng hoặc giải thưởng lớn.",
      "suc-khoe": "Sức khỏe tuyệt vời, vượt qua bệnh tật thành công.",
      "gia-dinh": "Niềm tự hào của gia đình. Mang vinh quang về cho dòng họ.",
    },
  },
  {
    name: "Seven of Wands",
    url: require("../../../assets/png/tarot/wands_07.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Bảo vệ tình yêu trước sự ngăn cản của người khác. Cần kiên định.",
      "cong-viec":
        "Đối mặt với sự cạnh tranh không lành mạnh hoặc chỉ trích. Cần giữ vững lập trường.",
      "tai-chinh":
        "Bảo vệ tài sản trước nguy cơ thất thoát. Cần thận trọng trong giao dịch.",
      "hoc-tap":
        "Phải nỗ lực gấp đôi để duy trì thành tích. Áp lực thi cử lớn.",
      "suc-khoe":
        "Hệ miễn dịch đang làm việc vất vả để chống lại bệnh tật. Cần nghỉ ngơi.",
      "gia-dinh":
        "Đứng ra bảo vệ quyền lợi cho gia đình hoặc giải quyết mâu thuẫn nội bộ.",
    },
  },
  {
    name: "Eight of Wands",
    url: require("../../../assets/png/tarot/wands_08.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Tình yêu sét đánh hoặc mối quan hệ tiến triển cực nhanh. Tin nhắn tình cảm tới tấp.",
      "cong-viec":
        "Dự án chạy nước rút, công việc bận rộn nhưng hiệu quả. Đi công tác gấp.",
      "tai-chinh": "Tiền về nhanh chóng, giao dịch chốt đơn liên tục.",
      "hoc-tap":
        "Tiếp thu kiến thức nhanh, hoàn thành bài tập sớm hơn dự định.",
      "suc-khoe":
        "Hồi phục nhanh chóng. Tránh các hoạt động quá mạnh gây chấn thương.",
      "gia-dinh": "Tin tức từ người thân ở xa, hoặc chuyến đi du lịch bất ngờ.",
    },
  },
  {
    name: "Nine of Wands",
    url: require("../../../assets/png/tarot/wands_09.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Mối quan hệ trải qua nhiều sóng gió, cần kiên trì để giữ gìn hạnh phúc.",
      "cong-viec":
        "Giai đoạn nước rút đầy mệt mỏi nhưng không được bỏ cuộc. Đề phòng rủi ro phút chót.",
      "tai-chinh":
        "Cần thận trọng bảo vệ tài sản tích lũy. Không nên đầu tư mạo hiểm lúc này.",
      "hoc-tap":
        "Áp lực thi cử căng thẳng nhưng kết quả sẽ xứng đáng với nỗ lực.",
      "suc-khoe": "Kiệt sức, mệt mỏi kéo dài. Cần đề phòng tái phát bệnh cũ.",
      "gia-dinh":
        "Cố gắng giữ gìn hòa khí gia đình dù có nhiều áp lực bên ngoài.",
    },
  },
  {
    name: "Ten of Wands",
    url: require("../../../assets/png/tarot/wands_10.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Cảm thấy nặng nề, áp lực trong mối quan hệ. Ôm đồm quá nhiều trách nhiệm.",
      "cong-viec":
        "Quá tải công việc, stress nặng. Cần học cách ủy quyền và chia sẻ bớt gánh nặng.",
      "tai-chinh": "Gánh nặng nợ nần hoặc áp lực kiếm tiền đè nặng lên vai.",
      "hoc-tap": "Chương trình học quá nặng, bài tập chồng chất gây mệt mỏi.",
      "suc-khoe":
        "Đau lưng, đau vai gáy, stress kéo dài. Cần nghỉ ngơi ngay lập tức.",
      "gia-dinh":
        "Gánh vác trách nhiệm gia đình một mình, cảm thấy cô đơn và mệt mỏi.",
    },
  },
  {
    name: "Page of Wands",
    url: require("../../../assets/png/tarot/wands_11.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Tin nhắn tán tỉnh, khởi đầu lãng mạn nhẹ nhàng. Tình yêu trẻ con, vui vẻ.",
      "cong-viec":
        "Nhận được tin tức tốt về công việc hoặc bắt đầu một dự án sáng tạo mới.",
      "tai-chinh":
        "Cơ hội kiếm tiền nhỏ nhưng thú vị. Khám phá kênh đầu tư mới.",
      "hoc-tap": "Hào hứng với kiến thức mới, tò mò và ham học hỏi.",
      "suc-khoe":
        "Sức khỏe tốt, năng động. Cẩn thận các tai nạn nhỏ do hiếu động.",
      "gia-dinh": "Gia đình có tin vui từ con cái hoặc người nhỏ tuổi.",
    },
  },
  {
    name: "Knight of Wands",
    url: require("../../../assets/png/tarot/wands_12.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Người yêu nhiệt huyết, nồng cháy nhưng hay thay đổi. Cuộc tình phiêu lưu.",
      "cong-viec":
        "Hành động quyết liệt, thay đổi công việc hoặc nơi ở. Năng lượng làm việc cao.",
      "tai-chinh": "Chi tiêu bốc đồng, đầu tư mạo hiểm. Cần kiểm soát ví tiền.",
      "hoc-tap":
        "Học tập hăng say nhưng thiếu kiên nhẫn. Cần tập trung vào mục tiêu dài hạn.",
      "suc-khoe":
        "Dễ bị chấn thương thể thao hoặc kiệt sức do hoạt động quá mức.",
      "gia-dinh": "Chuyến đi xa bất ngờ hoặc việc chuyển nhà gấp gáp.",
    },
  },
  {
    name: "Queen of Wands",
    url: require("../../../assets/png/tarot/wands_13.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Người phụ nữ quyến rũ, độc lập và thu hút. Mối quan hệ nồng nhiệt.",
      "cong-viec":
        "Nữ lãnh đạo tài năng, truyền cảm hứng. Công việc thăng tiến nhờ sự tự tin.",
      "tai-chinh":
        "Quản lý tài chính khéo léo, biết cách chi tiêu để tạo ra giá trị.",
      "hoc-tap": "Học tập hiệu quả, năng nổ tham gia các hoạt động ngoại khóa.",
      "suc-khoe": "Sức khỏe dồi dào, tràn đầy sức sống. Chú ý giữ dáng.",
      "gia-dinh": "Người mẹ/vợ đảm đang, là trung tâm giữ lửa cho gia đình.",
    },
  },
  {
    name: "King of Wands",
    url: require("../../../assets/png/tarot/wands_14.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Người đàn ông trưởng thành, quyến rũ và chủ động. Mối quan hệ bền vững, đam mê.",
      "cong-viec":
        "Lãnh đạo có tầm nhìn, doanh nhân thành đạt. Sự nghiệp đỉnh cao.",
      "tai-chinh":
        "Tài chính vững mạnh, đầu tư lớn. Có khả năng kiếm tiền xuất sắc.",
      "hoc-tap":
        "Đạt thành tích cao nhờ sự thông minh và chiến lược học tập đúng đắn.",
      "suc-khoe":
        "Sức khỏe cường tráng, dẻo dai. Cần chú ý huyết áp hoặc tim mạch.",
      "gia-dinh": "Người cha/chồng trụ cột, bảo vệ và định hướng cho gia đình.",
    },
  },

  // Cups
  {
    name: "Ace of Cups",
    url: require("../../../assets/png/tarot/cups_01.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Bắt đầu một tình yêu mới đẹp như mơ. Cảm xúc thăng hoa, hạnh phúc tràn đầy.",
      "cong-viec":
        "Công việc mới mang lại niềm vui và sự thỏa mãn tinh thần. Sự sáng tạo tuôn trào.",
      "tai-chinh":
        "Trực giác tài chính tốt. Có thể nhận được quà tặng hoặc sự giúp đỡ về tiền bạc.",
      "hoc-tap":
        "Tìm thấy niềm đam mê mới trong học tập. Cảm hứng sáng tạo dồi dào.",
      "suc-khoe":
        "Sức khỏe tinh thần và thể chất đều tốt. Tràn đầy năng lượng tích cực.",
      "gia-dinh":
        "Tin vui mang thai hoặc sự hòa thuận, yêu thương ngập tràn trong gia đình.",
    },
  },
  {
    name: "Two of Cups",
    url: require("../../../assets/png/tarot/cups_02.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Tình yêu đôi lứa hạnh phúc, sự thấu hiểu và gắn kết sâu sắc. Có thể đính hôn.",
      "cong-viec":
        "Hợp tác thành công, đối tác đáng tin cậy. Môi trường làm việc hòa đồng.",
      "tai-chinh": "Cân bằng thu chi. Hợp tác làm ăn sinh lời.",
      "hoc-tap": "Học nhóm hiệu quả, tìm được bạn đồng hành cùng tiến bộ.",
      "suc-khoe": "Sức khỏe ổn định. Cân bằng cảm xúc tốt.",
      "gia-dinh":
        "Hòa giải mâu thuẫn, sự gắn kết giữa các thành viên gia đình.",
    },
  },
  {
    name: "Three of Cups",
    url: require("../../../assets/png/tarot/cups_03.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Mối quan hệ vui vẻ, được bạn bè ủng hộ. Có thể gặp người yêu qua các buổi tiệc.",
      "cong-viec":
        "Thành công được chia sẻ cùng đồng đội. Môi trường làm việc như gia đình.",
      "tai-chinh":
        "Chi tiêu cho tiệc tùng, giải trí nhưng mang lại niềm vui. Tài lộc đến từ quan hệ xã hội.",
      "hoc-tap": "Học tập vui vẻ, tham gia nhiều hoạt động ngoại khóa sôi nổi.",
      "suc-khoe": "Tinh thần thoải mái, vui vẻ giúp cơ thể khỏe mạnh.",
      "gia-dinh": "Đoàn tụ gia đình, tổ chức tiệc mừng hoặc lễ kỷ niệm.",
    },
  },
  {
    name: "Four of Cups",
    url: require("../../../assets/png/tarot/cups_04.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Cảm thấy nhàm chán trong mối quan hệ hoặc từ chối lời tỏ tình. Cần làm mới cảm xúc.",
      "cong-viec":
        "Mất động lực làm việc, cảm thấy bế tắc. Bỏ qua các cơ hội tốt vì thiếu hứng thú.",
      "tai-chinh":
        "Thờ ơ với việc quản lý tài chính. Có tiền nhưng không biết chi tiêu sao cho vui.",
      "hoc-tap": "Chán học, thiếu tập trung. Cần tìm lại nguồn cảm hứng.",
      "suc-khoe": "Mệt mỏi, uể oải do thiếu vận động và tinh thần tiêu cực.",
      "gia-dinh":
        "Cảm thấy xa cách với người thân dù đang ở gần. Thu mình lại.",
    },
  },
  {
    name: "Five of Cups",
    url: require("../../../assets/png/tarot/cups_05.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Đau khổ vì tình cũ tan vỡ, thất vọng. Cần buông bỏ quá khứ để đón nhận cái mới.",
      "cong-viec":
        "Thất bại trong dự án hoặc bị chỉ trích. Đừng quá bi quan, vẫn còn hy vọng.",
      "tai-chinh":
        "Mất mát một khoản tiền, nhưng không phải là tất cả. Rút kinh nghiệm cho lần sau.",
      "hoc-tap":
        "Kết quả không như ý muốn, thất vọng về bản thân. Cần vực dậy tinh thần.",
      "suc-khoe":
        "Ảnh hưởng tâm lý gây mệt mỏi thể chất. Cần chữa lành vết thương lòng.",
      "gia-dinh":
        "Có chuyện buồn trong gia đình hoặc mâu thuẫn gây tổn thương.",
    },
  },
  {
    name: "Six of Cups",
    url: require("../../../assets/png/tarot/cups_06.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Gặp lại người yêu cũ hoặc hồi tưởng kỷ niệm đẹp. Mối quan hệ trong sáng, ngây thơ.",
      "cong-viec":
        "Làm việc trong môi trường quen thuộc hoặc quay lại công ty cũ. Sự giúp đỡ từ người quen.",
      "tai-chinh":
        "Nhận được quà tặng hoặc thừa kế từ người thân. Tài chính ổn định nhờ tích lũy cũ.",
      "hoc-tap": "Ôn lại kiến thức cũ, học hỏi từ kinh nghiệm quá khứ.",
      "suc-khoe": "Sức khỏe tốt, tinh thần thư thái như trẻ thơ.",
      "gia-dinh":
        "Nhớ về tuổi thơ, sum họp với anh chị em. Không khí gia đình ấm áp.",
    },
  },
  {
    name: "Seven of Cups",
    url: require("../../../assets/png/tarot/cups_07.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Có nhiều đối tượng theo đuổi nhưng chưa biết chọn ai. Cẩn thận tình yêu ảo ảnh.",
      "cong-viec":
        "Nhiều ý tưởng nhưng thiếu thực tế. Cần tập trung vào một mục tiêu cụ thể.",
      "tai-chinh":
        "Nhiều cơ hội đầu tư nhưng rủi ro cao. Cẩn thận bị lừa bởi vẻ hào nhoáng.",
      "hoc-tap":
        "Phân vân trong việc chọn ngành nghề. Mơ mộng quá nhiều mà thiếu hành động.",
      "suc-khoe": "Căng thẳng do suy nghĩ quá nhiều. Ảo giác hoặc mất ngủ.",
      "gia-dinh":
        "Mơ hồ về định hướng tương lai của gia đình. Thiếu sự thống nhất.",
    },
  },
  {
    name: "Eight of Cups",
    url: require("../../../assets/png/tarot/cups_08.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Chủ động rời bỏ một mối quan hệ nhạt nhẽo để tìm kiếm ý nghĩa thực sự.",
      "cong-viec":
        "Nghỉ việc để tìm hướng đi mới phù hợp với đam mê hơn. Từ bỏ sự ổn định nhàm chán.",
      "tai-chinh": "Từ bỏ lợi ích vật chất để theo đuổi giá trị tinh thần.",
      "hoc-tap":
        "Thay đổi ngành học vì nhận ra không còn phù hợp. Tìm kiếm tri thức sâu sắc hơn.",
      "suc-khoe": "Tìm kiếm các phương pháp chữa lành tâm hồn, thiền định.",
      "gia-dinh":
        "Rời xa gia đình để tự lập hoặc tìm khoảng lặng cho riêng mình.",
    },
  },
  {
    name: "Nine of Cups",
    url: require("../../../assets/png/tarot/cups_09.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Hài lòng với cuộc sống độc thân hoặc mối quan hệ hiện tại. Hạnh phúc tự thân.",
      "cong-viec":
        "Đạt được thành tựu mong muốn, cảm thấy tự hào. Công việc thuận lợi.",
      "tai-chinh": "Sung túc, dư dả. Tận hưởng cuộc sống sang chảnh.",
      "hoc-tap": "Đạt kết quả như ý nguyện. Tự tin vào khả năng của bản thân.",
      "suc-khoe": "Sức khỏe dồi dào, tinh thần sảng khoái. Ăn ngon ngủ kỹ.",
      "gia-dinh":
        "Gia đình sung túc, êm ấm. Mọi ước nguyện về gia đạo đều thành hiện thực.",
    },
  },
  {
    name: "Ten of Cups",
    url: require("../../../assets/png/tarot/cups_10.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Hôn nhân hạnh phúc, gia đình êm ấm. Tình yêu bền vững trọn đời.",
      "cong-viec":
        "Môi trường làm việc tuyệt vời, đồng nghiệp hỗ trợ nhau hết mình.",
      "tai-chinh": "Tài chính vững chắc đảm bảo cho tương lai cả gia đình.",
      "hoc-tap": "Hoàn thành xuất sắc việc học, được gia đình ủng hộ hết mình.",
      "suc-khoe": "Sức khỏe toàn diện, tinh thần an yên.",
      "gia-dinh":
        "Gia đình là số một. Sự đoàn tụ, yêu thương và hạnh phúc ngập tràn.",
    },
  },
  {
    name: "Page of Cups",
    url: require("../../../assets/png/tarot/cups_11.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Nhận được lời tỏ tình dễ thương hoặc tin nhắn lãng mạn. Tình yêu chớm nở.",
      "cong-viec":
        "Cơ hội công việc mới liên quan đến nghệ thuật hoặc sáng tạo. Tin vui.",
      "tai-chinh":
        "Cơ hội kiếm tiền nhỏ nhưng vui vẻ. Trực giác tài chính tốt.",
      "hoc-tap":
        "Hứng thú với các môn nghệ thuật, văn học. Trí tưởng tượng phong phú.",
      "suc-khoe": "Sức khỏe tốt, tinh thần lạc quan, yêu đời.",
      "gia-dinh": "Tin vui từ con cái hoặc người thân nhỏ tuổi.",
    },
  },
  {
    name: "Knight of Cups",
    url: require("../../../assets/png/tarot/cups_12.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Người yêu lãng mạn, ga lăng đang đến. Lời cầu hôn hoặc tỏ tình đầy chất thơ.",
      "cong-viec":
        "Theo đuổi đam mê nghệ thuật. Làm việc theo cảm hứng nhưng đầy sáng tạo.",
      "tai-chinh": "Chi tiêu theo cảm xúc, mua sắm những thứ đẹp đẽ.",
      "hoc-tap":
        "Học tập dựa trên cảm hứng. Thích hợp với các ngành nghệ thuật.",
      "suc-khoe": "Cần chú ý cân bằng cảm xúc để tránh mệt mỏi tinh thần.",
      "gia-dinh": "Không khí gia đình nhẹ nhàng, lãng mạn và đầy tình cảm.",
    },
  },
  {
    name: "Queen of Cups",
    url: require("../../../assets/png/tarot/cups_13.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Người phụ nữ dịu dàng, thấu hiểu và biết lắng nghe. Tình yêu sâu sắc, bao dung.",
      "cong-viec":
        "Làm việc trong lĩnh vực chăm sóc, tư vấn hoặc nghệ thuật. Trực giác tốt.",
      "tai-chinh": "Quản lý tài chính bằng trực giác và sự cẩn trọng.",
      "hoc-tap":
        "Tiếp thu kiến thức bằng cảm nhận sâu sắc. Giỏi văn học, tâm lý.",
      "suc-khoe": "Sức khỏe ổn định, chú ý các vấn đề về nội tiết hoặc tâm lý.",
      "gia-dinh":
        "Người mẹ hiền từ, luôn chăm sóc và lắng nghe tâm tư của con cái.",
    },
  },
  {
    name: "King of Cups",
    url: require("../../../assets/png/tarot/cups_14.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Người đàn ông trưởng thành, tình cảm nhưng điềm đạm. Chỗ dựa vững chắc.",
      "cong-viec":
        "Lãnh đạo tâm lý, thấu hiểu nhân viên. Giải quyết khủng hoảng êm đẹp.",
      "tai-chinh": "Ổn định tài chính, chi tiêu hợp lý và có trách nhiệm.",
      "hoc-tap":
        "Học tập ổn định, cân bằng tốt giữa việc học và đời sống tình cảm.",
      "suc-khoe": "Sức khỏe tốt, tinh thần vững vàng, ít bị dao động.",
      "gia-dinh":
        "Người cha mẫu mực, yêu thương gia đình một cách trầm lặng và sâu sắc.",
    },
  },

  // Swords
  {
    name: "Ace of Swords",
    url: require("../../../assets/png/tarot/swords_01.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Một khởi đầu mới dựa trên sự giao tiếp rõ ràng và chân thật. Giải quyết dứt điểm mâu thuẫn cũ.",
      "cong-viec":
        "Ý tưởng đột phá, quyết định sắc bén mang lại thành công. Khởi đầu dự án đòi hỏi trí tuệ.",
      "tai-chinh":
        "Phân tích tài chính rõ ràng, cắt giảm chi tiêu không cần thiết.",
      "hoc-tap": "Tư duy mạch lạc, xuất sắc trong các kỳ thi đòi hỏi logic.",
      "suc-khoe":
        "Phẫu thuật thành công hoặc quyết tâm thay đổi chế độ sinh hoạt.",
      "gia-dinh":
        "Cần nói chuyện thẳng thắn để giải quyết các vấn đề tồn đọng trong gia đình.",
    },
  },
  {
    name: "Two of Swords",
    url: require("../../../assets/png/tarot/swords_02.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Lưỡng lự giữa hai người hoặc giằng co nội tâm. Cố tình lảng tránh vấn đề.",
      "cong-viec":
        "Trì hoãn quyết định quan trọng. Bị mắc kẹt giữa các lựa chọn đối lập.",
      "tai-chinh":
        "Cân nhắc quá nhiều khiến lỡ mất cơ hội. Tình hình tài chính dậm chân tại chỗ.",
      "hoc-tap": "Không biết chọn ngành nào. bế tắc và thiếu thông tin.",
      "suc-khoe": "Căng thẳng dẫn đến đau đầu hoặc các vấn đề về mắt.",
      "gia-dinh":
        "Giữ thái độ trung lập trong các cuộc xung đột gia đình để tránh rắc rối.",
    },
  },
  {
    name: "Three of Swords",
    url: require("../../../assets/png/tarot/swords_03.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Chia tay, ly thân hoặc bị phản bội. Nỗi đau lớn nhưng cần đối mặt để chữa lành.",
      "cong-viec":
        "Bị đồng nghiệp chơi xấu, dự án thất bại. Cảm giác thất vọng tràn trề.",
      "tai-chinh":
        "Mất tiền, thua lỗ nặng. Cảm giác đau xót vì sai lầm tài chính.",
      "hoc-tap": "Thi trượt hoặc bị điểm kém gây sốc. Cần rút kinh nghiệm.",
      "suc-khoe":
        "Các vấn đề về tim mạch hoặc phẫu thuật. Sức khỏe suy giảm do buồn phiền.",
      "gia-dinh": "Xung đột gay gắt, lời nói làm tổn thương nhau sâu sắc.",
    },
  },
  {
    name: "Four of Swords",
    url: require("../../../assets/png/tarot/swords_04.jpg"),
    topicMeanings: {
      "tinh-duyen":
        'Tạm dừng yêu đương để chữa lành bản thân. Mối quan hệ "đóng băng" tạm thời.',
      "cong-viec":
        "Xin nghỉ phép, du lịch để giảm stress. Tạm gác lại công việc bề bộn.",
      "tai-chinh": "Không có biến động lớn. Nên giữ tiền và án binh bất động.",
      "hoc-tap": "Nghỉ ngơi sau kỳ thi căng thẳng. Cần thư giãn đầu óc.",
      "suc-khoe": "Cần ngủ đủ giấc, đi spa hoặc thiền định. Hồi phục sau bệnh.",
      "gia-dinh":
        "Không khí gia đình trầm lắng, mọi người cần không gian riêng.",
    },
  },
  {
    name: "Five of Swords",
    url: require("../../../assets/png/tarot/swords_05.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Cảm giác thua cuộc trong tình yêu, bị từ chối phũ phàng. Cần rút lui.",
      "cong-viec":
        "Mâu thuẫn lên đến đỉnh điểm, có thể bị sa thải hoặc tự xin nghỉ vì áp lực.",
      "tai-chinh": "Mất mát tài chính, cảm giác túng thiếu và bất lực.",
      "hoc-tap": "Kết quả tồi tệ, cảm thấy mình kém cỏi so với bạn bè.",
      "suc-khoe":
        "Suy nhược cơ thể, mệt mỏi rã rời sau thời gian dài căng thẳng.",
      "gia-dinh":
        "Cảm giác bị cô lập trong chính gia đình mình. Mâu thuẫn không lối thoát.",
    },
  },
  {
    name: "Six of Swords",
    url: require("../../../assets/png/tarot/swords_06.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Rời bỏ một mối quan hệ buồn đau để tìm bình yên. Chuyến đi xa cùng người yêu.",
      "cong-viec":
        "Chuyển công tác, thay đổi chỗ làm để tránh môi trường độc hại.",
      "tai-chinh":
        "Tình hình tài chính dần ổn định hơn sau giai đoạn khó khăn.",
      "hoc-tap":
        "Chuyển trường hoặc thay đổi phương pháp học tập tích cực hơn.",
      "suc-khoe": "Dần hồi phục sức khỏe. Nên đi nghỉ dưỡng ở miền biển.",
      "gia-dinh":
        "Chuyển nhà hoặc cả gia đình đi du lịch để giải tỏa căng thẳng.",
    },
  },
  {
    name: "Seven of Swords",
    url: require("../../../assets/png/tarot/swords_07.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Có sự che giấu, không thành thật trong mối quan hệ. Cẩn thận người thứ ba.",
      "cong-viec":
        "Đồng nghiệp chơi xấu sau lưng. Cần bảo mật thông tin dự án.",
      "tai-chinh":
        "Nên cẩn thận trộm cắp hoặc bị lừa tiền. Kiểm tra kỹ hợp đồng.",
      "hoc-tap":
        "Gian lận trong thi cử hoặc trốn học. Muốn đạt kết quả mà không cần nỗ lực.",
      "suc-khoe": "Bệnh tiềm ẩn chưa phát hiện ra. Nên đi khám tổng quát.",
      "gia-dinh": "Có bí mật bị che giấu gây mất niềm tin giữa các thành viên.",
    },
  },
  {
    name: "Eight of Swords",
    url: require("../../../assets/png/tarot/swords_08.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Cảm thấy bị trói buộc trong mối quan hệ, không dám nói lên tiếng nói của mình.",
      "cong-viec":
        "Bế tắc trong công việc, cảm thấy bất lực không thể thay đổi tình hình.",
      "tai-chinh": "Nợ nần chồng chất, không tìm thấy lối thoát tài chính.",
      "hoc-tap": "Sợ hãi thi cử, tự ti về năng lực bản thân khiến kết quả kém.",
      "suc-khoe":
        "Chứng sợ hãi, lo âu, mất ngủ triền miên. Cần giải phóng tâm trí.",
      "gia-dinh": "Cảm thấy bị gia đình áp đặt, kìm kẹp không thể tự do.",
    },
  },
  {
    name: "Nine of Swords",
    url: require("../../../assets/png/tarot/swords_09.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Mất ngủ vì lo lắng cho mối quan hệ. Ghen tuông mù quáng hoặc hối hận.",
      "cong-viec": "Stress cực độ vì áp lực deadline. Lo sợ thất bại.",
      "tai-chinh": "Lo lắng thái quá về tiền bạc gây ảnh hưởng sức khỏe.",
      "hoc-tap": "Căng thẳng trước kỳ thi, học ngày cày đêm gây kiệt sức.",
      "suc-khoe": "Suy nhược thần kinh, đau đầu, mất ngủ kéo dài.",
      "gia-dinh":
        "Lo lắng cho sức khỏe hoặc sự an nguy của người thân đến mất ăn mất ngủ.",
    },
  },
  {
    name: "Ten of Swords",
    url: require("../../../assets/png/tarot/swords_10.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Chia tay đau đớn, bị 'cắm sừng' công khai. Chấm dứt hoàn toàn.",
      "cong-viec":
        "Bị sa thải, phá sản hoặc thất bại thảm hại. Mọi công sức đổ sông đổ bể.",
      "tai-chinh": "Phá sản, mất trắng tài sản. Rơi vào hoàn cảnh túng quẫn.",
      "hoc-tap": "Bỏ học giữa chừng hoặc trượt tốt nghiệp. Khủng hoảng tâm lý.",
      "suc-khoe":
        "Bệnh nặng hoặc chấn thương nghiêm trọng. Cần trị liệu lâu dài.",
      "gia-dinh": "Gia đình tan vỡ, ly tán. Nỗi đau mất mát người thân.",
    },
  },
  {
    name: "Page of Swords",
    url: require("../../../assets/png/tarot/swords_11.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Thích tranh luận, phân tích đối phương. Mối quan hệ dựa trên sự thông minh, hóm hỉnh.",
      "cong-viec":
        "Thu thập thông tin, nghiên cứu dữ liệu. Giỏi giao tiếp và đàm phán.",
      "tai-chinh": "Cẩn thận tính toán từng đồng. Thích đầu tư vào kiến thức.",
      "hoc-tap":
        "Thông minh, học nhanh hiểu rộng. Thích đặt câu hỏi phản biện.",
      "suc-khoe": "Sức khỏe tốt nhưng hay lo nghĩ. Cần tập hít thở.",
      "gia-dinh": "Hay tranh luận với người thân, bảo vệ quan điểm cá nhân.",
    },
  },
  {
    name: "Knight of Swords",
    url: require("../../../assets/png/tarot/swords_12.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Tiến tới nhanh chóng, thẳng thắn nhưng thiếu lãng mạn. Dễ gây tổn thương.",
      "cong-viec":
        "Thực hiện dự án thần tốc, cạnh tranh khốc liệt. Tham vọng lớn.",
      "tai-chinh":
        "Kiếm tiền nhanh nhưng cũng tiêu nhanh. Liều lĩnh trong đầu tư.",
      "hoc-tap": "Học tập cường độ cao, thông minh nhưng thiếu kiên nhẫn.",
      "suc-khoe": "Dễ bị tai nạn do vội vàng, hấp tấp. Cần sống chậm lại.",
      "gia-dinh": "Không khí gia đình căng thẳng do những quyết định vội vã.",
    },
  },
  {
    name: "Queen of Swords",
    url: require("../../../assets/png/tarot/swords_13.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Độc lập, lạnh lùng và kén chọn. Cần người thông minh tương xứng.",
      "cong-viec":
        "Nhà quản lý nghiêm khắc, công bằng. Giao tiếp sắc sảo, thuyết phục.",
      "tai-chinh": "Quản lý tài chính chặt chẽ, không chi tiêu bừa bãi.",
      "hoc-tap": "Học giỏi các môn tự nhiên, logic. Có tư duy phản biện tốt.",
      "suc-khoe": "Sức khỏe ổn định, biết cách tự chăm sóc bản thân khoa học.",
      "gia-dinh":
        "Người mẹ nghiêm khắc nhưng dạy con rất giỏi. Gia đình nề nếp.",
    },
  },
  {
    name: "King of Swords",
    url: require("../../../assets/png/tarot/swords_14.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Người đàn ông lý trí, ít thể hiện cảm xúc. Mối quan hệ dựa trên sự tôn trọng.",
      "cong-viec":
        "Lãnh đạo uy quyền, chuyên gia tư vấn hoặc luật sư giỏi. Quyết định chính xác.",
      "tai-chinh":
        "Đầu tư dựa trên phân tích số liệu chuẩn xác. Tài chính minh bạch.",
      "hoc-tap":
        "Đạt đỉnh cao trong học thuật, nghiên cứu. Là chuyên gia trong lĩnh vực của mình.",
      "suc-khoe": "Cần chú ý các vấn đề về thần kinh, phẫu thuật.",
      "gia-dinh":
        "Trụ cột gia đình, đưa ra những lời khuyên và quy tắc đúng đắn cho con cái.",
    },
  },

  // Pentacles
  {
    name: "Ace of Pentacles",
    url: require("../../../assets/png/tarot/pentacles_01.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Mối quan hệ bền vững, mang lại cảm giác an toàn. Có thể nhận được quà tặng giá trị.",
      "cong-viec":
        "Nhận được dự án mới béo bở, tăng lương hoặc cơ hội thăng tiến rõ rệt.",
      "tai-chinh":
        "Vận may tài chính lớn, trúng số hoặc đầu tư sinh lời ngay lập tức.",
      "hoc-tap":
        "Có đủ điều kiện vật chất để học tập tốt nhất. Học bổng giá trị.",
      "suc-khoe":
        "Sức khỏe dồi dào, nền tảng thể lực tốt để bắt đầu kế hoạch mới.",
      "gia-dinh":
        "Gia đình sung túc, có tài sản thừa kế hoặc mua sắm tài sản lớn.",
    },
  },
  {
    name: "Two of Pentacles",
    url: require("../../../assets/png/tarot/pentacles_02.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Cố gắng cân bằng giữa tình yêu và công việc. Mối quan hệ vui vẻ nhưng chưa ổn định.",
      "cong-viec":
        "Xoay sở nhiều việc cùng lúc, quản lý dòng tiền linh hoạt. Thích nghi tốt.",
      "tai-chinh": "Cần khéo léo co kéo chi tiêu. Dòng tiền vào ra liên tục.",
      "hoc-tap": "Vừa học vừa làm, cần sắp xếp thời gian hợp lý.",
      "suc-khoe": "Cần giữ thăng bằng trong cuộc sống để tránh stress nhẹ.",
      "gia-dinh":
        "Cân đối ngân sách gia đình, xoay sở các khoản chi tiêu hàng ngày.",
    },
  },
  {
    name: "Three of Pentacles",
    url: require("../../../assets/png/tarot/pentacles_03.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Xây dựng mối quan hệ dựa trên sự tôn trọng và hỗ trợ lẫn nhau. Cùng nhau phấn đấu.",
      "cong-viec":
        "Làm việc nhóm hiệu quả, được công nhận chuyên môn. Dự án thành công nhờ hợp tác.",
      "tai-chinh":
        "Kiếm tiền nhờ kỹ năng nghề nghiệp vững chắc. Hợp tác đầu tư tốt.",
      "hoc-tap": "Học nhóm hiệu quả, được thầy cô đánh giá cao ý thức học tập.",
      "suc-khoe": "Làm theo lời khuyên của chuyên gia hoặc bác sĩ.",
      "gia-dinh":
        "Cùng nhau sửa sang nhà cửa hoặc lên kế hoạch chung cho gia đình.",
    },
  },
  {
    name: "Four of Pentacles",
    url: require("../../../assets/png/tarot/pentacles_04.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Chiếm hữu, kiểm soát người yêu quá mức. Sợ bị tổn thương nên khép lòng.",
      "cong-viec":
        "Giữ khư khư cách làm cũ, ngại đổi mới. Không muốn chia sẻ kiến thức.",
      "tai-chinh":
        "Tiết kiệm quá mức thành keo kiệt. Sợ mất tiền nên không dám đầu tư.",
      "hoc-tap":
        "Học vẹt, bám vào kiến thức cũ kỹ. Sợ sai nên không dám phát biểu.",
      "suc-khoe":
        "Căng thẳng do lo âu, giữ mọi thứ trong lòng gây táo bón hoặc tắc nghẽn.",
      "gia-dinh": "Kiểm soát tài chính gia đình quá chặt, gây ngột ngạt.",
    },
  },
  {
    name: "Five of Pentacles",
    url: require("../../../assets/png/tarot/pentacles_05.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Cảm thấy bị bỏ rơi, lạnh lẽo trong mối quan hệ. Khó khăn tài chính ảnh hưởng tình cảm.",
      "cong-viec": "Thất nghiệp, mất việc hoặc công ty gặp khó khăn tài chính.",
      "tai-chinh":
        "Túng thiếu, nợ nần, mất mát tài sản. Giai đoạn 'thắt lưng buộc bụng'.",
      "hoc-tap": "Thiếu thốn điều kiện học tập, gặp khó khăn về học phí.",
      "suc-khoe": "Sức khỏe kém do điều kiện sống thiếu thốn hoặc lo âu.",
      "gia-dinh":
        "Gia đình gặp khó khăn kinh tế, cảm giác bị cô lập với họ hàng.",
    },
  },
  {
    name: "Six of Pentacles",
    url: require("../../../assets/png/tarot/pentacles_06.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Mối quan hệ có sự cho đi nhận lại công bằng. Được người yêu chiều chuộng, tặng quà.",
      "cong-viec":
        "Được tăng lương, nhận tiền thưởng hoặc được sếp nâng đỡ. Giúp đỡ đồng nghiệp.",
      "tai-chinh":
        "Tài chính dư dả, làm từ thiện hoặc giúp đỡ người khác. Nhận được sự hỗ trợ.",
      "hoc-tap":
        "Được học bổng tài trợ hoặc được thầy cô, bạn bè giúp đỡ kiến thức.",
      "suc-khoe": "Sức khỏe tốt, có điều kiện chăm sóc bản thân.",
      "gia-dinh": "Chia sẻ tài sản, hỗ trợ tài chính cho người thân.",
    },
  },
  {
    name: "Seven of Pentacles",
    url: require("../../../assets/png/tarot/pentacles_07.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Kiên nhẫn chờ đợi tình yêu đơm hoa kết trái. Đánh giá lại mối quan hệ lâu dài.",
      "cong-viec":
        "Chờ đợi kết quả dự án. Đầu tư dài hạn sắp đến ngày hái quả.",
      "tai-chinh":
        "Lợi nhuận đến chậm nhưng chắc. Cần kiên nhẫn với các khoản đầu tư.",
      "hoc-tap":
        "Học tập cần cù, chờ đợi kết quả thi. Đánh giá lại phương pháp học.",
      "suc-khoe": "Quá trình trị liệu đang tiến triển tốt, cần kiên trì.",
      "gia-dinh": "Tiết kiệm cho tương lai con cái hoặc kế hoạch mua nhà.",
    },
  },
  {
    name: "Eight of Pentacles",
    url: require("../../../assets/png/tarot/pentacles_08.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Nỗ lực vun đắp mối quan hệ từng chút một. Tình yêu bền vững nhờ sự cố gắng.",
      "cong-viec":
        "Làm việc chăm chỉ, tỉ mỉ. Tập trung nâng cao tay nghề chuyên môn.",
      "tai-chinh":
        "Kiếm tiền bằng sức lao động chân chính. Tích tiểu thành đại.",
      "hoc-tap": "Học ngày cày đêm, chăm chỉ làm bài tập để đạt điểm cao.",
      "suc-khoe": "Rèn luyện thể dục thể thao đều đặn, kỷ luật.",
      "gia-dinh": "Chăm lo cho gia đình từng bữa ăn giấc ngủ.",
    },
  },
  {
    name: "Nine of Pentacles",
    url: require("../../../assets/png/tarot/pentacles_09.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Hạnh phúc với cuộc sống độc thân sang chảnh. Tình yêu đẳng cấp, không phụ thuộc.",
      "cong-viec": "Thành đạt, có vị thế riêng. Tận hưởng thành quả lao động.",
      "tai-chinh":
        "Giàu có, tự do tài chính. Mua sắm hàng hiệu không cần nhìn giá.",
      "hoc-tap": "Tự tin vào kiến thức của mình. Đạt được thành tựu cao.",
      "suc-khoe": "Sức khỏe tốt, chăm sóc sắc đẹp spa, nghỉ dưỡng sang trọng.",
      "gia-dinh": "Gia đình có điều kiện, cuộc sống thoải mái, tiện nghi.",
    },
  },
  {
    name: "Ten of Pentacles",
    url: require("../../../assets/png/tarot/pentacles_10.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Hôn nhân bền vững, gia đình môn đăng hộ đối. Cuộc sống viên mãn.",
      "cong-viec":
        "Sự nghiệp vững chắc, kế thừa doanh nghiệp gia đình hoặc tập đoàn lớn.",
      "tai-chinh":
        "Tài sản khổng lồ, thừa kế hoặc tích lũy qua nhiều thế hệ. Giàu nứt đố đổ vách.",
      "hoc-tap": "Được đầu tư giáo dục tốt nhất. Nền tảng tri thức vững chắc.",
      "suc-khoe": "Sức khỏe di truyền tốt, sống thọ cùng con cháu.",
      "gia-dinh":
        "Đại gia đình sum họp, sung túc. Ông bà cha mẹ con cháu quây quần.",
    },
  },
  {
    name: "Page of Pentacles",
    url: require("../../../assets/png/tarot/pentacles_11.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Mối quan hệ thực tế, nghiêm túc. Cùng nhau xây dựng tương lai.",
      "cong-viec":
        "Bắt đầu một dự án kinh doanh mới. Học hỏi kinh nghiệm thực tế.",
      "tai-chinh": "Cơ hội đầu tư nhỏ an toàn. Bắt đầu tiết kiệm.",
      "hoc-tap": "Chăm chỉ học tập, đạt kết quả tốt nhờ cần cù.",
      "suc-khoe": "Sức khỏe ổn định. Bắt đầu chế độ tập luyện mới kiên trì.",
      "gia-dinh": "Nhận được tin vui về tiền bạc hoặc học hành từ con cái.",
    },
  },
  {
    name: "Knight of Pentacles",
    url: require("../../../assets/png/tarot/pentacles_12.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Người yêu chung thủy, đáng tin cậy nhưng hơi khô khan. Mối quan hệ tiến triển chậm mà chắc.",
      "cong-viec":
        "Làm việc có trách nhiệm, kiên trì. Là nhân viên mẫn cán được sếp tin tưởng.",
      "tai-chinh": "Tích lũy đều đặn, không mạo hiểm. Tài chính an toàn.",
      "hoc-tap": "Học tập cần cù bù thông minh. Kiên trì sẽ đạt kết quả cao.",
      "suc-khoe": "Sức khỏe dẻo dai, bền bỉ.",
      "gia-dinh":
        "Người con hiếu thảo, người chồng trách nhiệm lo toan kinh tế.",
    },
  },
  {
    name: "Queen of Pentacles",
    url: require("../../../assets/png/tarot/pentacles_13.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Người phụ nữ đảm đang, biết chăm lo. Tình yêu gắn liền với trách nhiệm và sự chăm sóc.",
      "cong-viec":
        "Quản lý giỏi, kinh doanh mát tay. Môi trường làm việc ổn định.",
      "tai-chinh": "Tài chính dư dả, chi tiêu hợp lý. Giỏi giữ tiền.",
      "hoc-tap": "Học tập hiệu quả, áp dụng tốt kiến thức vào thực tế.",
      "suc-khoe":
        "Chăm sóc sức khỏe bản thân và gia đình rất tốt. Ăn uống khoa học.",
      "gia-dinh": "Người mẹ tuyệt vời, đảm đang quán xuyến mọi việc trong nhà.",
    },
  },
  {
    name: "King of Pentacles",
    url: require("../../../assets/png/tarot/pentacles_14.jpg"),
    topicMeanings: {
      "tinh-duyen":
        "Người đàn ông thành đạt, bao bọc che chở. Mối quan hệ vững chắc như bàn thạch.",
      "cong-viec":
        "Ông chủ lớn, doanh nhân thành đạt. Sự nghiệp đỉnh cao vững chắc.",
      "tai-chinh": "Giàu có, tài sản lớn. Đầu tư đâu thắng đó.",
      "hoc-tap":
        "Đạt thành tích xuất sắc, có nền tảng vững chắc để phát triển sự nghiệp.",
      "suc-khoe":
        "Sức khỏe cường tráng, nhưng cần chú ý cân nặng hoặc bệnh nhà giàu.",
      "gia-dinh":
        "Trụ cột vững chắc về kinh tế cho cả đại gia đình. Cuộc sống vương giả.",
    },
  },
];

export const TAROT_CONFIG: TarotConfig = {
  cardCount: TAROT_DATA.length,
  radius: 0, // Not used in spread layout
  cardWidth: 1.2,
  cardHeight: 2.0,
  inspectPos: { x: 0, y: 0, z: 8.5 }, // Brought forward for better view
  inspectScale: 0.75, // Increased scale
  storageScale: 0.15,
  storageZ: 9.0, // Closer to camera (z: 12)
  storeMarginX: 0.15,
  storeMarginTop: 1.5,
  storeGapY: 0.35,
  // Spread layout config
  spreadLayout: {
    cardsPerRow: 16, // More rows, less width
    cardSpacing: 1.3,
    rowSpacing: 2.2,
    startZ: -4,
    arcHeight: 0.2,
  },
};

export const READING_CONTEXTS = ["PAST", "PRESENT", "FUTURE"];

export const SCENE_CONFIG = {
  fog: { color: 0x050505, density: 0.02 },
  camera: { fov: 60, near: 0.1, far: 100, position: { x: 0, y: 0, z: 12 } },
  lighting: {
    ambient: { color: 0xffffff, intensity: 0.6 },
    spot: { color: 0xffffff, intensity: 2.0, position: { x: 0, y: 10, z: 10 } },
  },
  stars: { count: 1200, size: 0.8, opacity: 0.9 },
};

export const TAROT_TOPICS: TarotTopic[] = [
  {
    id: "tinh-duyen",
    title: "Romance",
  },
  {
    id: "hoc-tap",
    title: "Education",
  },
  {
    id: "cong-viec",
    title: "Career",
  },
  {
    id: "tai-chinh",
    title: "Finance",
  },
  {
    id: "suc-khoe",
    title: "Health",
  },
  {
    id: "gia-dinh",
    title: "Family",
  },
];
