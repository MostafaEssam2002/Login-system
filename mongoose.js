// ========================================
// ملف: package.json
// ========================================
{
    "name": "mongoose-guide-pdf-generator",
    "version": "1.0.0",
    "description": "توليد دليل Mongoose شامل بصيغة PDF بالعربية",
    "main": "index.js",
    "scripts": {
      "start": "node index.js",
      "dev": "nodemon index.js"
    },
    "keywords": ["mongoose", "pdf", "guide", "arabic"],
    "author": "",
    "license": "MIT",
    "dependencies": {
      "puppeteer": "^21.5.0",
      "express": "^4.18.2"
    },
    "devDependencies": {
      "nodemon": "^3.0.1"
    }
  }
  
  // ========================================
  // ملف: index.js
  // ========================================
  const express = require('express');
  const puppeteer = require('puppeteer');
  const path = require('path');
  const { getHTMLContent } = require('./content');
  
  const app = express();
  const PORT = 3000;
  
  // Middleware
  app.use(express.static('public'));
  app.use(express.json());
  
  // الصفحة الرئيسية
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  });
  
  // توليد PDF
  app.get('/generate-pdf', async (req, res) => {
    try {
      console.log('بدء توليد ملف PDF...');
      
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      
      // تعيين المحتوى HTML
      await page.setContent(getHTMLContent(), {
        waitUntil: 'networkidle0'
      });
      
      // توليد PDF
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm'
        },
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate: `
          <div style="width: 100%; font-size: 10px; text-align: center; color: #666; padding: 5px;">
            <span class="pageNumber"></span> / <span class="totalPages"></span>
          </div>
        `
      });
      
      await browser.close();
      
      console.log('تم توليد PDF بنجاح!');
      
      // إرسال الملف للمستخدم
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=mongoose-guide-ar.pdf');
      res.send(pdfBuffer);
      
    } catch (error) {
      console.error('خطأ في توليد PDF:', error);
      res.status(500).json({ error: 'حدث خطأ في توليد ملف PDF' });
    }
  });
  
  // معاينة المحتوى
  app.get('/preview', (req, res) => {
    res.send(getHTMLContent());
  });
  
  app.listen(PORT, () => {
    console.log(`🚀 السيرفر يعمل على: http://localhost:${PORT}`);
    console.log(`📄 لتوليد PDF: http://localhost:${PORT}/generate-pdf`);
    console.log(`👀 للمعاينة: http://localhost:${PORT}/preview`);
  });
  
  // ========================================
  // ملف: content.js
  // ========================================
  function getHTMLContent() {
    return `
  <!DOCTYPE html>
  <html dir="rtl" lang="ar">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>دليل Mongoose الشامل</title>
    <style>
      @page { 
        size: A4; 
        margin: 2cm;
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.8;
        color: #333;
        direction: rtl;
        background: white;
      }
      
      .container {
        max-width: 900px;
        margin: 0 auto;
        padding: 20px;
      }
      
      .header {
        text-align: center;
        margin-bottom: 40px;
        padding: 30px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 10px;
        page-break-after: avoid;
      }
      
      .header h1 {
        font-size: 36px;
        margin-bottom: 10px;
      }
      
      .header p {
        font-size: 18px;
        opacity: 0.9;
      }
      
      h1 {
        color: #880000;
        border-bottom: 3px solid #880000;
        padding-bottom: 10px;
        font-size: 28px;
        margin-top: 30px;
        margin-bottom: 20px;
        page-break-after: avoid;
      }
      
      h2 {
        color: #c45500;
        border-right: 4px solid #c45500;
        padding-right: 15px;
        margin-top: 30px;
        margin-bottom: 15px;
        font-size: 22px;
        page-break-after: avoid;
      }
      
      h3 {
        color: #2c5aa0;
        margin-top: 20px;
        margin-bottom: 10px;
        font-size: 18px;
        page-break-after: avoid;
      }
      
      p {
        margin-bottom: 15px;
        text-align: justify;
      }
      
      code {
        background: #f4f4f4;
        padding: 2px 6px;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
        direction: ltr;
        display: inline-block;
        font-size: 13px;
        color: #c7254e;
      }
      
      pre {
        background: #2d2d2d;
        color: #f8f8f2;
        padding: 15px;
        border-radius: 5px;
        overflow-x: auto;
        direction: ltr;
        text-align: left;
        margin: 15px 0;
        page-break-inside: avoid;
        font-size: 13px;
      }
      
      pre code {
        background: transparent;
        padding: 0;
        color: #f8f8f2;
      }
      
      .note {
        background: #e7f3ff;
        border-right: 4px solid #2196F3;
        padding: 15px;
        margin: 15px 0;
        border-radius: 4px;
        page-break-inside: avoid;
      }
      
      .warning {
        background: #fff3e0;
        border-right: 4px solid #ff9800;
        padding: 15px;
        margin: 15px 0;
        border-radius: 4px;
        page-break-inside: avoid;
      }
      
      ul, ol {
        margin: 10px 0 15px 0;
        padding-right: 30px;
      }
      
      li {
        margin: 8px 0;
      }
      
      .footer {
        text-align: center;
        margin-top: 50px;
        padding: 20px;
        border-top: 2px solid #ddd;
        color: #666;
        font-size: 14px;
        page-break-before: avoid;
      }
      
      strong {
        color: #000;
      }
      
      .section {
        margin-bottom: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>دليل Mongoose الشامل</h1>
        <p>MongoDB Object Modeling for Node.js</p>
      </div>
  
      <div class="section">
        <h2>📚 ما هو Mongoose؟</h2>
        <p>
          Mongoose هو مكتبة ODM (Object Data Modeling) لـ MongoDB وNode.js. يوفر حلاً مباشراً ومبني على المخططات (Schema-based) لنمذجة بيانات التطبيق الخاص بك. يتضمن التحقق من الصحة المدمج، وإنشاء الاستعلامات، وخطافات منطق الأعمال، والمزيد.
        </p>
  
        <div class="note">
          <strong>💡 ملاحظة:</strong> Mongoose يبسط العمل مع MongoDB من خلال توفير طبقة تجريدية قوية تجعل الكود أكثر قابلية للصيانة وأمانًا.
        </div>
      </div>
  
      <div class="section">
        <h2>🚀 التثبيت والإعداد</h2>
        
        <h3>التثبيت عبر npm:</h3>
        <pre><code>npm install mongoose</code></pre>
  
        <h3>الاتصال بقاعدة البيانات:</h3>
        <pre><code>const mongoose = require('mongoose');
  
  // الاتصال بقاعدة البيانات
  mongoose.connect('mongodb://localhost:27017/myapp')
    .then(() => console.log('تم الاتصال بقاعدة البيانات'))
    .catch(err => console.error('خطأ في الاتصال:', err));
  
  // أو استخدام async/await
  async function connectDB() {
    try {
      await mongoose.connect('mongodb://localhost:27017/myapp');
      console.log('تم الاتصال بنجاح');
    } catch (error) {
      console.error('فشل الاتصال:', error);
    }
  }</code></pre>
      </div>
  
      <div class="section">
        <h2>📋 المخططات (Schemas)</h2>
        <p>
          المخطط (Schema) يحدد بنية المستند (Document) داخل المجموعة (Collection). يحدد الحقول وأنواعها والتحقق من الصحة والقيم الافتراضية.
        </p>
  
        <h3>إنشاء مخطط بسيط:</h3>
        <pre><code>const { Schema } = mongoose;
  
  const userSchema = new Schema({
    name: {
      type: String,
      required: [true, 'الاسم مطلوب'],
      trim: true,
      minlength: [3, 'الاسم يجب أن يكون 3 أحرف على الأقل']
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    age: {
      type: Number,
      min: [18, 'يجب أن يكون العمر 18 عامًا أو أكثر'],
      max: 120
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });</code></pre>
  
        <h3>أنواع البيانات المتاحة:</h3>
        <ul>
          <li><code>String</code> - نص</li>
          <li><code>Number</code> - رقم</li>
          <li><code>Date</code> - تاريخ</li>
          <li><code>Boolean</code> - قيمة منطقية</li>
          <li><code>Buffer</code> - بيانات ثنائية</li>
          <li><code>Mixed</code> - أي نوع</li>
          <li><code>ObjectId</code> - معرف كائن MongoDB</li>
          <li><code>Array</code> - مصفوفة</li>
          <li><code>Decimal128</code> - أرقام عشرية دقيقة</li>
          <li><code>Map</code> - خريطة</li>
        </ul>
      </div>
  
      <div class="section">
        <h2>🎯 النماذج (Models)</h2>
        <p>
          النموذج (Model) هو فئة منشأة من المخطط. توفر النماذج واجهة للتفاعل مع قاعدة البيانات لإنشاء واستعلام وتحديث وحذف السجلات.
        </p>
  
        <pre><code>// إنشاء نموذج من المخطط
  const User = mongoose.model('User', userSchema);
  
  // إنشاء مستند جديد
  const newUser = new User({
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    age: 25
  });
  
  // حفظ المستند
  await newUser.save();</code></pre>
      </div>
  
      <div class="section">
        <h2>📝 عمليات CRUD</h2>
  
        <h3>الإنشاء (Create):</h3>
        <pre><code>// الطريقة الأولى: استخدام save()
  const user = new User({ name: 'سارة', email: 'sara@example.com' });
  await user.save();
  
  // الطريقة الثانية: استخدام create()
  const user2 = await User.create({
    name: 'محمد',
    email: 'mohamed@example.com',
    age: 30
  });
  
  // إنشاء عدة مستندات
  await User.insertMany([
    { name: 'فاطمة', email: 'fatima@example.com' },
    { name: 'علي', email: 'ali@example.com' }
  ]);</code></pre>
  
        <h3>القراءة (Read):</h3>
        <pre><code>// البحث عن جميع المستخدمين
  const users = await User.find();
  
  // البحث بشرط
  const activeUsers = await User.find({ isActive: true });
  
  // البحث عن مستند واحد
  const user = await User.findOne({ email: 'ahmed@example.com' });
  
  // البحث بالمعرف
  const userById = await User.findById('507f1f77bcf86cd799439011');
  
  // تحديد الحقول المطلوبة
  const usersNames = await User.find().select('name email -_id');
  
  // الترتيب والتحديد
  const sortedUsers = await User.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .skip(0);</code></pre>
  
        <h3>التحديث (Update):</h3>
        <pre><code>// تحديث مستند واحد
  await User.updateOne(
    { email: 'ahmed@example.com' },
    { age: 26 }
  );
  
  // تحديث عدة مستندات
  await User.updateMany(
    { isActive: false },
    { isActive: true }
  );
  
  // البحث والتحديث
  const updatedUser = await User.findOneAndUpdate(
    { email: 'sara@example.com' },
    { age: 28 },
    { new: true, runValidators: true }
  );</code></pre>
  
        <h3>الحذف (Delete):</h3>
        <pre><code>// حذف مستند واحد
  await User.deleteOne({ email: 'old@example.com' });
  
  // حذف عدة مستندات
  await User.deleteMany({ isActive: false });
  
  // البحث والحذف
  const deletedUser = await User.findOneAndDelete({
    email: 'delete@example.com'
  });</code></pre>
      </div>
  
      <div class="section">
        <h2>🔗 العلاقات (Relationships)</h2>
  
        <h3>العلاقة واحد لكثير (One-to-Many):</h3>
        <pre><code>const postSchema = new Schema({
    title: String,
    content: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: { type: Date, default: Date.now }
  });
  
  const Post = mongoose.model('Post', postSchema);</code></pre>
  
        <h3>استخدام Populate:</h3>
        <pre><code>// جلب المستند مع البيانات المرجعية
  const post = await Post.findById(postId)
    .populate('author', 'name email');
  
  // populate متعدد
  const post = await Post.findById(postId)
    .populate('author')
    .populate('comments');</code></pre>
      </div>
  
      <div class="section">
        <h2>✅ التحقق من الصحة (Validation)</h2>
  
        <h3>مدققات مدمجة:</h3>
        <pre><code>const productSchema = new Schema({
    name: {
      type: String,
      required: [true, 'اسم المنتج مطلوب'],
      minlength: 3,
      maxlength: 100,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'السعر لا يمكن أن يكون سالبًا'],
      max: 100000
    },
    category: {
      type: String,
      enum: ['إلكترونيات', 'ملابس', 'طعام', 'أخرى'],
      required: true
    }
  });</code></pre>
  
        <h3>مدققات مخصصة:</h3>
        <pre><code>const userSchema = new Schema({
    password: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v);
        },
        message: 'كلمة المرور ضعيفة'
      }
    }
  });</code></pre>
      </div>
  
      <div class="section">
        <h2>🎣 Middleware (Hooks)</h2>
        <p>
          Middleware هي وظائف تعمل قبل أو بعد عمليات معينة على المستندات.
        </p>
  
        <h3>Pre Middleware:</h3>
        <pre><code>// قبل الحفظ
  userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      // تشفير كلمة المرور
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });</code></pre>
  
        <h3>Post Middleware:</h3>
        <pre><code>// بعد الحفظ
  userSchema.post('save', function(doc) {
    console.log('تم حفظ المستخدم:', doc.name);
  });</code></pre>
      </div>
  
      <div class="section">
        <h2>🔧 الدوال الافتراضية (Virtual Properties)</h2>
        <p>
          الخصائص الافتراضية هي خصائص يمكنك الحصول عليها وتعيينها ولكن لا يتم حفظها في MongoDB.
        </p>
  
        <pre><code>userSchema.virtual('fullInfo').get(function() {
    return \`\${this.name} - \${this.email}\`;
  });
  
  // استخدام الخاصية الافتراضية
  const user = await User.findOne();
  console.log(user.fullInfo);</code></pre>
      </div>
  
      <div class="section">
        <h2>🔍 الاستعلامات المتقدمة</h2>
  
        <pre><code>// استخدام المعاملات
  const users = await User.find({
    age: { $gte: 18, $lte: 65 },
    isActive: true
  });
  
  // البحث النصي
  const results = await User.find({
    $text: { $search: 'أحمد محمد' }
  });
  
  // Or و And
  const users = await User.find({
    $or: [
      { age: { $lt: 18 } },
      { age: { $gt: 65 } }
    ]
  });
  
  // استعلام معقد
  const users = await User.find()
    .where('age').gte(18).lte(65)
    .where('isActive').equals(true)
    .select('name email')
    .sort('-createdAt')
    .limit(10);</code></pre>
      </div>
  
      <div class="section">
        <h2>🔒 أفضل الممارسات</h2>
  
        <div class="note">
          <strong>✨ نصائح مهمة:</strong>
          <ul>
            <li>استخدم التحقق من الصحة على مستوى المخطط</li>
            <li>أنشئ فهارس (Indexes) للحقول التي تستعلم عنها بشكل متكرر</li>
            <li>استخدم <code>lean()</code> للاستعلامات للقراءة فقط لتحسين الأداء</li>
            <li>تجنب استخدام <code>Mixed</code> إلا عند الضرورة</li>
            <li>استخدم <code>select()</code> لتحديد الحقول المطلوبة فقط</li>
            <li>أغلق الاتصال بقاعدة البيانات عند الانتهاء</li>
          </ul>
        </div>
  
        <h3>إنشاء الفهارس:</h3>
        <pre><code>// فهرس بسيط
  userSchema.index({ email: 1 });
  
  // فهرس فريد
  userSchema.index({ email: 1 }, { unique: true });
  
  // فهرس مركب
  userSchema.index({ name: 1, email: 1 });
  
  // فهرس نصي
  userSchema.index({ name: 'text', bio: 'text' });</code></pre>
  
        <h3>تحسين الأداء:</h3>
        <pre><code>// استخدام lean() للاستعلامات للقراءة فقط
  const users = await User.find().lean();
  
  // Projection لتقليل البيانات المنقولة
  const users = await User.find().select('name email -_id');</code></pre>
      </div>
  
      <div class="section">
        <div class="warning">
          <strong>⚠️ تحذيرات:</strong>
          <ul>
            <li>لا تنسى إغلاق الاتصال بقاعدة البيانات</li>
            <li>احذر من N+1 Query Problem عند استخدام populate</li>
            <li>تحقق دائمًا من وجود الأخطاء</li>
            <li>لا تخزن بيانات حساسة بدون تشفير</li>
          </ul>
        </div>
      </div>
  
      <div class="section">
        <h2>🎓 خاتمة</h2>
        <p>
          Mongoose هو أداة قوية وشاملة للعمل مع MongoDB في بيئة Node.js. يوفر طبقة تجريد ممتازة تجعل العمل مع قواعد البيانات أكثر أمانًا وسهولة. هذا الدليل يغطي المفاهيم الأساسية والمتقدمة، لكن التوثيق الرسمي يحتوي على المزيد من التفاصيل والأمثلة.
        </p>
  
        <div class="note">
          <strong>📚 موارد إضافية:</strong>
          <ul>
            <li>التوثيق الرسمي: mongoosejs.com</li>
            <li>GitHub Repository: github.com/Automattic/mongoose</li>
            <li>Stack Overflow للأسئلة والمشاكل</li>
          </ul>
        </div>
      </div>
  
      <div class="footer">
        <p><strong>دليل Mongoose الشامل باللغة العربية</strong></p>
        <p>تم الإعداد في نوفمبر 2025</p>
      </div>
    </div>
  </body>
  </html>
    `;
  }
  
  module.exports = { getHTMLContent };
  
  // ========================================
  // ملف: views/index.html
  // ========================================
  <!DOCTYPE html>
  <html dir="rtl" lang="ar">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مولد PDF دليل Mongoose</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        direction: rtl;
      }
      
      .container {
        background: white;
        border-radius: 20px;
        padding: 40px;
        max-width: 600px;
        width: 100%;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      }
      
      h1 {
        color: #667eea;
        text-align: center;
        margin-bottom: 10px;
        font-size: 32px;
      }
      
      p {
        text-align: center;
        color: #666;
        margin-bottom: 30px;
        line-height: 1.6;
      }
      
      .features {
        background: #f8f9fa;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 30px;
      }
      
      .features h2 {
        color: #333;
        font-size: 20px;
        margin-bottom: 15px;
      }
      
      .features ul {
        list-style: none;
        padding: 0;
      }
      
      .features li {
        padding: 8px 0;
        color: #555;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .features li::before {
        content: "✓";
        color: #667eea;
        font-weight: bold;
        font-size: 20px;
      }
      
      .buttons {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
      }
      
      button {
        flex: 1;
        min-width: 200px;
        padding: 15px 30px;
        font-size: 16px;
        font-weight: bold;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }
      
      .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }
      
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
      }
      
      .btn-secondary {
        background: #f8f9fa;
        color: #667eea;
        border: 2px solid #667eea;
      }
      
      .btn-secondary:hover {
        background: #667eea;
        color: white;
      }
      
      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      .loading {
        display: none;
        text-align: center;
        margin-top: 20px;
        color: #667eea;
        font-weight: bold;
      }
      
      .loading.active {
        display: block;
      }
      
      .spinner {
        border: 3px solid #f3f3f3;
        border-top: 3px solid #667eea;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 10px auto;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>📄 مولد دليل Mongoose PDF</h1>
      <p>
        دليل شامل لتعلم Mongoose باللغة العربية مع أمثلة عملية وشروحات مفصلة
      </p>
      
      <div class="features">
        <h2>📚 محتويات الدليل:</h2>
        <ul>
          <li>مقدمة شاملة عن Mongoose</li>
          <li>التثبيت والإعداد الكامل</li>
          <li>المخططات والنماذج</li>
          <li>عمليات CRUD بالتفصيل</li>
          <li>العلاقات والـ Populate</li>
          <li>التحقق من الصحة</li>
          <li>Middleware و Hooks</li>
          <li>الاستعلامات المتقدمة</li>
          <li>أفضل الممارسات</li>
        </ul>
      </div>
      
      <div class="buttons">
        <button class="btn-primary" onclick="generatePDF()">
          <span>📥</span>
          <span>تحميل PDF</span>
        </button>
        <button class="btn-secondary" onclick="preview()">
          <span>👁</span>
          <span>معاينة المحتوى</span>
        </button>
      </div>
      
      <div class="loading" id="loading">
        <div class="spinner"></div>
        <p>جاري توليد ملف PDF...</p>
      </div>
    </div>
    
    <script>
      async function generatePDF() {
        const loading = document.getElementById('loading');
        const buttons = document.querySelectorAll('button');
        
        loading.classList.add('active');
        buttons.forEach(btn => btn.disabled = true);
        
        try {
          const response = await fetch('/generate-pdf');
          const blob = await response.blob();
          
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'mongoose-guide-ar.pdf';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          
          alert('✅ تم تحميل الملف بنجاح!');
        } catch (error) {
          console.error('خطأ:', error);
          alert('❌ حدث خطأ في تحميل الملف');
        } finally {
          loading.classList.remove('active');
          buttons.forEach(btn => btn.disabled = false);
        }
      }
      
      function preview() {
        window.open('/preview', '_blank');
      }
    </script>
  </body>
  </html>
  
  // ========================================
  // ملف: .gitignore
  // ========================================
  node_modules/
  *.pdf
  .env
  package-lock.json
  
  // ========================================
  // ملف: README.md
  // ========================================
  # مولد PDF دليل Mongoose
  
  مشروع Node.js لتوليد دليل Mongoose الشامل بصيغة PDF باللغة العربية
  
  ## المميزات
  
  - ✅ دليل شامل بالعربية
  - ✅ أمثلة عملية وشروحات مفصلة
  - ✅ تنسيق احترافي وسهل القراءة
  - ✅ توليد PDF عالي الجودة
  - ✅ معاينة المحتوى قبل التحميل
  
  ## التثبيت
  
  1. تأكد من تثبيت Node.js (الإصدار 14 أو أحدث)
  
  2. نسخ المشروع:
  ```bash
  git clone <repository-url>
  cd mongoose-guide-pdf-generator
  ```
  
  3. تثبيت المكتبات:
  ```bash
  npm install
  ```
  
  ## التشغيل
  
  ### تشغيل عادي:
  ```bash
  npm start
  ```
  
  ### تشغيل مع التحديث التلقائي (Development):
  ```bash
  npm run dev
  ```
  
  ## الاستخدام
  
  1. شغل السيرفر بالأمر `npm start`
  
  2. افتح المتصفح على: `http://localhost:3000`
  
  3. اضغط على زر "تحميل PDF" لتوليد وتحميل الملف
  
  4. أو اضغط "معاينة المحتوى" لمشاهدة المحتوى في المتصفح
  
  ## Routes المتاحة
  
  - `GET /` - الصفحة الرئيسية
  - `GET /generate-pdf` - توليد وتحميل ملف PDF
  - `GET /preview` - معاينة المحتوى في المتصفح
  
  ## بنية المشروع
  
  ```
  mongoose-guide-pdf-generator/
  ├── index.js           # السيرفر الرئيسي
  ├── content.js         # محتوى الدليل HTML
  ├── views/
  │   └── index.html     # واجهة المستخدم
  ├── package.json       # معلومات المشروع
  └── README.md          # هذا الملف
  ```
  
  ## المكتبات المستخدمة
  
  - **Express**: للسيرفر وإدارة الـ Routes
  - **Puppeteer**: لتوليد ملفات PDF من HTML
  - **Nodemon**: للتطوير مع التحديث التلقائي
  
  ## ملاحظات مهمة
  
  - Puppeteer سيقوم بتحميل Chromium تلقائياً عند التثبيت الأول
  - حجم التحميل قد يكون كبيراً (~170MB) بسبب Chromium
  - تأكد من وجود مساحة كافية على القرص
  
  ## حل المشاكل الشائعة
  
  ### مشكلة: Puppeteer لا يعمل
  ```bash
  # تثبيت المكتبات المطلوبة (Linux)
  sudo apt-get install -y chromium-browser
  
  # أو إعادة تثبيت puppeteer
  npm uninstall puppeteer
  npm install puppeteer
  ```
  
  ### مشكلة: خطأ في الـ Port
  ```bash
  # تغيير البورت في index.js
  const PORT = 3001; // بدلاً من 3000
  ```
  
  ## التخصيص
  
  ### تغيير محتوى الدليل:
  عدل ملف `content.js` وغير المحتوى داخل دالة `getHTMLContent()`
  
  ### تغيير التنسيق:
  عدل الـ CSS داخل ملف `content.js` في قسم `<style>`
  
  ### تغيير إعدادات PDF:
  عدل إعدادات `page.pdf()` في ملف `index.js`:
  ```javascript
  const pdfBuffer = await page.pdf({
    format: 'A4',
    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
    // أضف إعدادات أخرى هنا
  });
  ```
  
  ## الترخيص
  
  MIT License - استخدم المشروع بحرية!
  
  ## المساهمة
  
  المساهمات مرحب بها! لا تتردد في فتح Issue أو Pull Request
  
  ---
  
  صنع بـ ❤️ للمطورين العرب