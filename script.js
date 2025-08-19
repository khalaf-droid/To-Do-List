const listContainer = document.getElementById("list-container"); 
const inputBox = document.getElementById("input-box");

function addTask(){ 

    if(inputBox.value === ''){alert("Enter Some Data");}

    else{
        let li = document.createElement("li");
        // بننشئ عنصر قائمة <li> جديد لتمثيل المهمة

        li.innerHTML = inputBox.value;
        // بنحط نص المهمة جوا الـ <li> باستخدام innerHTML
        // ملاحظة أمان: لو المستخدم دخل HTML أو سكربت، innerHTML هينفذه — أحسن تستخدم textContent
        // مثال آمن: li.textContent = inputBox.value;

        listContainer.appendChild(li);
        // نضيف الـ <li> لنهاية الحاوية عشان تظهر للمستخدم

        let span = document.createElement("span");
        // بننشئ عنصر <span> هيكون زر الحذف (الـ ×)

        span.innerHTML = "\u00d7";
        // بنحط رمز × داخل الـ span علشان يبان زر الحذف
        // \u00d7 ده الترميز الخاص بالرمز "×"

        li.appendChild(span);
        // نضيف الـ span جوا الـ li بعد النص، يبقى كل مهمة معاها زر حذف
    }

    inputBox.value = "";
    // نفرّغ خانة الإدخال بعد الإضافة عشان المستخدم يقدر يكتب مهمة جديدة

    saveTask();
    // نحفظ الحالة في localStorage كل مرة نضيف مهمة
}

listContainer.addEventListener("click",function(e){
    // بنستخدم event delegation — بنركّب ليسنر على الحاوية بدل تركيب لكل عنصر لوحده
    // المتغير e هو الـ event و e.target هو العنصر اللي اتضغط فعليًا

    if(e.target.tagName === "LI"){
       e.target.classList.toggle("checked");
       // لو المستخدم دوس على الـ li نفسها، نبدّل كلاس "checked" (مثلاً لتأشير المهمة كمكتملة)
       // CSS ممكن تعمل .checked { text-decoration: line-through; opacity: .6; } أو حاجة زي كده

        saveTask();
        // بعد تغيير حالة المهمة نحفظ التحديث في localStorage
    }else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        // لو المستخدم دوس على الـ span (زر الحذف)، نحذف العنصر الأب (<li>) من الصفحة

        saveTask();
        // وبعدين نحفظ التغيير بعد الحذف
    }
});

function saveTask(){
    localStorage.setItem("data", listContainer.innerHTML);
    // نحفظ محتوى الحاوية بالكامل (HTML) في localStorage تحت المفتاح "data"
    // ملاحظة: حفظ innerHTML سهل لكن ليه عيوب:
    //  - لو استخدمت innerHTML هتحفظ كل HTML بما فيه سمات وأكواد ممكن تكون ضارة.
    //  - لو عايز تخزين أكثر مرونة/أمان، احفظ مصفوفة من النصوص JSON: 
    //    const tasks = Array.from(listContainer.querySelectorAll("li")).map(li => li.textContent.replace('×','').trim());
    //    localStorage.setItem("data", JSON.stringify(tasks));
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    // لما الصفحة تفتح نجيب البيانات من localStorage ونحطها كـ innerHTML في الحاوية
    // ملاحظة مهمة: لو مفيش بيانات، localStorage.getItem هيُرجع null، و innerHTML = null هيتحول لنص "null" في الـ DOM — عشان كده الأفضل:
    //    listContainer.innerHTML = localStorage.getItem("data") || "";
    // أو، لو خزّنت JSON، parse وبعدها تبني العناصر DOM آمن:
    //    const tasks = JSON.parse(localStorage.getItem("data") || "[]");
    //    tasks.forEach(t => { /* create li with textContent = t */ });
}

showTask();
// ننفذ showTask فور تحميل السكربت عشان نعرض المهام المحفوظة من آخر مرة
