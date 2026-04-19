import json

with open('js/translations.js', 'r', encoding='utf-8') as f:
    orig = f.read()

# basic naive split to separate JS variable declaration from JSON
start = orig.find('{')
json_str = orig[start:orig.rfind(';')]

data = json.loads(json_str)

texts = {
    "en": {
        "about_aura_p1": "Aura Capital Asset specializes in curated, high-potential real estate investments across Thailand. We focus on properties with clear legal paths, high development feasibility, and strategic locations that offer long-term value appreciation.",
        "about_aura_p2": "By working directly with owners, we ensure transparency and provide the most competitive valuation for our partners and buyers. Our portfolio ranges from premium city condominiums to vast development land plots in growing tourism and wellness hubs."
    },
    "th": {
        "about_aura_p1": "Aura Capital Asset มีความเชี่ยวชาญด้านการลงทุนอสังหาริมทรัพย์ระดับพรีเมียมที่มีศักยภาพสูงทั่วประเทศไทย เราคัดสรรอสังหาริมทรัพย์ที่มีความชัดเจนทางกฎหมาย ความเป็นไปได้ในการพัฒนาสูง และทำเลเชิงกลยุทธ์ที่มอบการเพิ่มมูลค่าในระยะยาว",
        "about_aura_p2": "การทำงานร่วมกับเจ้าของโดยตรงช่วยให้แน่ใจถึงความโปร่งใสและมอบการประเมินมูลค่าที่คุ้มค่าที่สุดให้กับพันธมิตรและผู้ซื้อ พอร์ตโฟลิโอของเราครอบคลุมตั้งแต่คอนโดมิเนียมระดับพรีเมียมใจกลางเมืองไปจนถึงที่ดินเปล่าผืนใหญ่ในศูนย์กลางการท่องเที่ยวและสุขภาพที่กำลังเติบโต"
    },
    "zh": {
        "about_aura_p1": "Aura Capital Asset 专注于整个泰国精选的、高潜力的房地产投资。我们侧重于产权清晰、开发可行性高、且位于具有长期升值战略位置的房产。",
        "about_aura_p2": "通过直接与业主合作，我们确保透明度，并为我们的合作伙伴及买家提供最具竞争力的估值。我们的投资组合丰富多样，从城市优质公寓到不断发展的旅游和康养中心的大型开发地块一应俱全。"
    },
    "lo": {
        "about_aura_p1": "Aura Capital Asset ມີຄວາມຊ່ຽວຊານໃນການລົງທຶນອະສັງຫາລິມະຊັບທີ່ມີສັກກະຍະພາບສູງໃນທົ່ວປະເທດໄທ. ພວກເຮົາເນັ້ນໃສ່ຊັບສິນທີ່ມີຄວາມຊັດເຈນທາງກົດໝາຍ, ຄວາມເປັນໄປໄດ້ໃນການພັດທະນາສູງ ແລະ ທີ່ຕັ້ງຍຸດທະສາດທີ່ສະໜອງມູນຄ່າເພີ່ມໃນໄລຍະຍາວ.",
        "about_aura_p2": "ການເຮັດວຽກໂດຍກົງກັບເຈົ້າຂອງຊ່ວຍໃຫ້ພວກເຮົາມີຄວາມໂປ່ງໃສ ແລະ ໃຫ້ມູນຄ່າທີ່ແຂ່ງຂັນທີ່ສຸດສໍາລັບຄູ່ຮ່ວມງານ ແລະ ຜູ້ຊື້ຂອງພວກເຮົາ. ອະສັງຫາລິມະຊັບຂອງພວກເຮົາກວມເອົາຕັ້ງແຕ່ຄອນໂດລະດັບພຣີມຽມໃນເມືອງໄປຫາທີ່ດິນຂະໜາດໃຫຍ່ເພືອການພັດທະນາໃນສູນທ່ອງທ່ຽວ ແລະ ສຸຂະພາບສ່ວນກາງ."
    },
    "ja": {
        "about_aura_p1": "Aura Capital Assetは、タイ全土にわたる厳選された高ポテンシャルな不動産投資を専門としています。明確な法的権利、高い開発の実現可能性、そして長期的な資産価値の向上をもたらす戦略的な立地を持つ物件に焦点を当てています。",
        "about_aura_p2": "オーナーと直接取引することで、透明性を確保し、パートナーや購入者に最も競争力のある価格評価を提供します。当社のポートフォリオは、都市部の高級コンドミニアムから、成長する観光・ウェルネスハブにおける広大な開発用地まで多岐にわたります。"
    },
    "ko": {
        "about_aura_p1": "Aura Capital Asset은 태국 전역의 엄선된 잠재력 높은 부동산 투자를 전문으로 합니다. 우리는 명확한 법적 절차, 높은 개발 타당성, 그리고 장기적인 가치 상승을 제공하는 전략적 입지를 갖춘 부동산에 중점을 둡니다.",
        "about_aura_p2": "소유주와 직접 거래함으로써 투명성을 보장하며 파트너와 구매자에게 가장 경쟁력 있는 가치를 제공합니다. 저희의 포트폴리오는 프리미엄 도심 아파트부터 성장하는 관광 및 웰니스 허브의 광활한 개발 부지까지 다양합니다."
    }
}

for lang, vals in data.items():
    if lang in texts:
        vals.update(texts[lang])

out_json = json.dumps(data, indent=2, ensure_ascii=False)
final_out = f"const translations = {out_json};\n"

with open('js/translations.js', 'w', encoding='utf-8') as f:
    f.write(final_out)

