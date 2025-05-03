# In-Browser Markdown Editor

Bu proje, tarayıcı üzerinde çalışan modern ve kullanıcı dostu bir Markdown editörüdür. React ve Vite kullanılarak geliştirilmiştir.

## Özellikler

- **Markdown Düzenleme ve Önizleme**

  - Gerçek zamanlı Markdown önizleme
  - Bölünmüş ekran görünümü (düzenleme/önizleme)
  - Markdown sözdizimi vurgulama

- **Dosya Yönetimi**

  - Yeni döküman oluşturma
  - Dökümanları kaydetme ve düzenleme
  - Döküman başlıklarını düzenleme
  - Dökümanları silme

- **Kullanıcı Arayüzü**

  - Açık/Koyu tema desteği
  - Duyarlı tasarım (Responsive Design)
  - Yan menü gizleme/gösterme özelliği
  - Modern ve temiz arayüz

- **Veri Saklama**
  - Tarayıcı yerel depolaması (LocalStorage) kullanarak veri kalıcılığı
  - Tema tercihi saklama
  - Otomatik kaydetme

## Teknoloji Yığını

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.5
- **Markdown Parser**: Marked 15.0.6
- **Paket Yöneticisi**: npm

## Kurulum

1. Projeyi klonlayın:

```bash
git clone https://github.com/MrDemirtas/in-browser-markdown-editor.git
cd in-browser-markdown-editor
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

4. Tarayıcınızda açın:

```
http://localhost:5173
```

## Kullanım

1. **Yeni Döküman Oluşturma**

   - Sol üst köşedeki "+ New Document" butonuna tıklayın
   - Yeni bir boş döküman oluşturulacaktır

2. **Döküman Düzenleme**

   - Sol panelden düzenlemek istediğiniz dökümana tıklayın
   - Markdown içeriğini düzenleyin
   - Sağ panelde önizlemeyi görüntüleyin

3. **Döküman Kaydetme**

   - Sağ üst köşedeki kaydet butonuna tıklayın
   - Değişiklikler otomatik olarak yerel depolamaya kaydedilecektir

4. **Tema Değiştirme**
   - Sol alt köşedeki tema değiştirme düğmesini kullanın
   - Açık/koyu tema arasında geçiş yapın

## Geliştirme

- `npm run build`: Üretim için derleme
- `npm run preview`: Derlenmiş sürümü önizleme
- `npm run lint`: Kod kalitesi kontrolü
