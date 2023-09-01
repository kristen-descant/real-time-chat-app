# Generated by Django 4.2.4 on 2023-08-31 22:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('forum_topics_app', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Posts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField()),
                ('edited', models.BooleanField(default=False)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField()),
                ('up', models.IntegerField(default=0)),
                ('down', models.IntegerField(default=0)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_post', to=settings.AUTH_USER_MODEL)),
                ('topic_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='forum_topics_app.forumtopics')),
            ],
        ),
    ]
