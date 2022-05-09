import Mock from 'mockjs'

const { Random } = Mock

const province = Mock.mock({
  'name|2-4': [
    function () {
      return Random.ctitle(2, 5)
    },
  ],
}).name

const city = Mock.mock({
  'name|2-4': [
    function () {
      return Random.ctitle(2, 5)
    },
  ],
}).name

const district = Mock.mock({
  'name|2-4': [
    function () {
      return Random.ctitle(2, 5)
    },
  ],
}).name

const type = ['教师', '公务员', '学生']

const age = ['20-30', '31-40', '41-50', '51-60']

Random.extend({
  name: function () {
    return this.pick(province)
  },
  city: function () { 
    return this.pick(city)
  },
  district: function () { 
    return this.pick(district)
  },
  type: function () { 
    return this.pick(type)
  }
})

let res = {
  data:[]
}

province.forEach((provinceElem) => { 
  city.forEach((cityElem) => { 
    district.forEach((districtElem) => { 
      type.forEach((typeElem) => { 
        age.forEach((ageElem) => { 
          res.data.push({
            'provice': provinceElem,
            'city': cityElem,
            'district': districtElem,
            'type':typeElem,
            'age': ageElem,
            'income': Mock.mock({ 'income|1000-9900.1-2': 1000 }).income,
            'spending':Mock.mock({ 'income|1000-9900.1-2': 1000 }).income            
          })
        })
      })
    })
  })
})




export default res
