## 1. Soru

Callback yapısıyla çalışan birçok fonksiyon, birbiriyle ard arda çağrılmak istendiğinde, ortaya çıkan kod yapısı kolayca
anlaşılamayacak bir hale gelebiliyor. Javascript'te genellikle bu tarz fonksiyonlar, argümanlarından birisinde callback
fonksiyonu alırlar. Eğer callback fonksiyonu da argüman olarak bir callback fonksiyonu alıyorsa, ve bu birkaç seviye
boyunca aynı şekilde ilerlerse sonuç kaçınılmaz olarak bir "cehennem" oluyor.

Callback cehenneminden çıkmak için genellikle fonksiyonların `async / await` versiyonları varsa bunlar kullanılır. Eğer
yoksa da bu fonksiyonun yapısı `Promise` döndürecek şekilde değiştirilebilir. Böylece kod yapısı sağa doğru değil,
aşağıya doğru büyür ve takip edilebilir. Örnek vermek gerekirse core paketlerden fs ile bir dosya okuma callback ile
çalışıyor.

`fs.readFile('path.txt', callbackFunc)`

Bu fonksiyonun async / await ile kullanılabilir bir versiyonu mevcut olmadığı için kendi özel fonksiyonumuzu
yaratmalıyız.

```javascript
function readFileAsync(path) {
  return new Promise((res, rej) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        return rej(err)
      }
      return res(data)
    })
  })
}
```

Her seferinde bu kadar zahmete girmek yerine, bu işlemi otomatik olarak gerçekleştiren 3. parti bir paket veya yine core
paketlerden util.promisify gibi yardımcı fonksiyonlar kullanılabilir.

## 2. Soru

NodeJS temelinde bir EventLoop bulundurur. EventLoop'un görevi sisteme gelen isteklerin birbirini bloklamayacak şekilde
işlemektir. Sisteme gelen istekler bir işlem havuzunda birikir ve sırayla işleme konur. İşlemler sırayla başlamış olsa
da, işlemlerin sonuçlanması çoğu zaman aynı sırayla olmaz. Eğer bir işlem bloklayıcıysa, yani dosya okuma / yazma veya
veritabanından veri çekme gibi işlem içeriyorsa, bu işlemin diğer işlemleri bloklamaması için bu işlem Thread Pool'a
yöneltilir. Evet, bizim yazdığımız kodlar single thread olarak işleniyor ancak NodeJS iç mekanizmasında aslında bir
Thread Pool barındırıyor. Ancak bu Thread Pool, bizim NodeJS uygulamamızı Multi Thread bir şekilde yazmamızı
gerektirmeyecek bir şekilde tasarlanmış bir iç mekanizma. Bu sayede EventLoop'un kendisi sürekli çalışmaya devam ediyor
ve yeni bir istek geldiği zaman bu isteği kabul edebiliyor.

## 3. Soru

Express'te global bir değişken kullanmak için iki tane yöntem var. Bir tanesi `app.locals` objesi üzerine tanımlamalar
yapmak. Bir diğeri de `app.set('property', value)` şeklinde key - value değeri tanımlamak.

İkinci yöntem için bazı rezerve kelimeler bulunması ve genellikle konfigürasyon için kullanılması dolayısıyla ilki daha
çok tercih ediliyor.

Alternatif olarak NodeJS globals objesi kullanılarak da bu durum çözülebilir ancak oldukça kötü bir yöntem olur. Çünkü
bu takip edilemeyecek bir bağımlılık yaratır. Ayrıca bu değişken üzerinde hiçbir modülün sahipliği olmadığı için hatalı
işlemlere çok açıktır.

## 4. Soru

func1'deki Promise'in callback fonksiyonunda, `function` tanımlandığı için artık yeni bir scope'a geçilmiştir ve this'in
değeri o fonksiyon olur. Bunun önüne geçmek için iki çözüm var:

a) this'i yeni bir değişken içerisinde korumak.

```javascript
const parent = {
  // ...
  func1: function() {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.func2().then((count) => {
        console.log(count + 1);
      });
    });
  }
}
```

b) Arrow function kullanarak scope'u korumak.

```javascript
parent = {
  // ...
  func1: function() {
    return new Promise((resolve, reject) => {
      this.func2().then((count) => {
        console.log(count + 1);
      });
    });
  }
}
```